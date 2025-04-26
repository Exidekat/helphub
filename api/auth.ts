/**
 * api/auth.ts
 *
 * This serverless function handles authentication-related endpoints:
 *   - Auto authentication (action=auto) [GET]
 *   - Sending a verification code (action=send-code) [POST]
 *   - Verifying a code (action=verify-code) [POST]
 *
 * Expected usage:
 *   GET  /api/auth?action=auto
 *   POST /api/auth?action=send-code  with JSON body { phone: string }
 *   POST /api/auth?action=verify-code  with JSON body { phone: string, code: string }
 */

import { VercelRequest, VercelResponse } from '@vercel/node';
import { formatPhone, log } from '../backend/lib/utils';
import { getSmsCode, saveSmsCode, removeSmsCode, getUserByPhone, createUser } from '../backend/lib/pg';

const SMS_CODE_EXPIRY_DAYS = 30;
const TEXTBELT_KEY = process.env.TEXTBELT_KEY;
if (!TEXTBELT_KEY) {
  throw new Error('Textbelt credentials are not properly set in environment variables.');
}

// Helper to generate a random 6-digit code.
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default async (req: VercelRequest, res: VercelResponse) => {
  // Set CORS headers to allow requests from all origins (or restrict to your Capacitor origin as needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-phone');

  // Handle preflight OPTIONS request by returning a proper JSON response.
  if (req.method === 'OPTIONS') {
    res.status(200).json({});
    return;
  }

  const url = new URL(req.url, 'http://dummy');
  const action = url.searchParams.get('action');

  if (!action) {
    res.status(400).json({ error: 'Missing action query parameter' });
    return;
  }

  // Auto authentication: GET /api/auth?action=auto
  if (action === 'auto') {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method Not Allowed for auto authentication' });
      return;
    }
    const cookieHeader = req.headers.cookie || '';
    const cookies = Object.fromEntries(cookieHeader.split(';').map(c => c.trim().split('=')));
    const authCode = cookies['authCode'];
    const phone = cookies['phone'];
    if (!authCode || !phone) {
      res.status(401).json({ error: 'Missing authentication cookies' });
      return;
    }
    let formattedPhone: string;
    try {
      formattedPhone = formatPhone(phone);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
      return;
    }
    const record = await getSmsCode(formattedPhone);
    if (!record) {
      res.status(400).json({ error: 'No auth code found for this phone' });
      return;
    }
    if (new Date() > new Date(record.expires_at)) {
      res.status(400).json({ error: 'The authentication code has expired' });
      return;
    }
    if (record.code !== authCode) {
      res.status(400).json({ error: 'Invalid authentication code' });
      return;
    }
    const newExpiresAt = new Date(Date.now() + SMS_CODE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    await saveSmsCode(formattedPhone, authCode, newExpiresAt);
    let user = await getUserByPhone(formattedPhone);
    if (!user) {
      user = await createUser(formattedPhone, "");
    }
    res.setHeader('Set-Cookie', [
      `authCode=${authCode}; Max-Age=${SMS_CODE_EXPIRY_DAYS * 24 * 60 * 60}; Path=/; HttpOnly`,
      `phone=${formattedPhone}; Max-Age=${SMS_CODE_EXPIRY_DAYS * 24 * 60 * 60}; Path=/; HttpOnly`
    ]);
    res.status(200).json({ success: true, user });
    return;
  }

  // Send verification code: POST /api/auth?action=send-code
  if (action === 'send-code') {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method Not Allowed for send-code' });
      return;
    }
    try {
      const { phone: rawPhone } = req.body;
      if (!rawPhone) {
        res.status(400).json({ error: 'Phone number is required.' });
        return;
      }
      let phone: string;
      try {
        phone = formatPhone(rawPhone);
      } catch (e: any) {
        res.status(400).json({ error: e.message });
        return;
      }
      const code = generateCode();
      const expiresAt = new Date(Date.now() + SMS_CODE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
      await saveSmsCode(phone, code, expiresAt);
      const smsmessage = `Your ResQ verification code is: ${code}`;
      log(smsmessage);
      const params = new URLSearchParams();
      params.append('phone', phone);
      params.append('message', smsmessage);
      params.append('key', TEXTBELT_KEY);
      const response = await fetch('https://textbelt.com/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      const result = await response.json();
      if (result.success) {
        log('Textbelt Message sent successfully, id:', result.id);
        res.status(200).json({ success: true });
      } else {
        log('Textbelt error:', result);
        res.status(500).json({ error: 'Failed to send SMS.' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
    return;
  }

  // Verify code: POST /api/auth?action=verify-code
  if (action === 'verify-code') {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method Not Allowed for verify-code' });
      return;
    }
    try {
      const { phone: rawPhone, code } = req.body;
      if (!rawPhone || !code) {
        res.status(400).json({ error: 'Phone number and code are required.' });
        return;
      }
      let phone: string;
      try {
        phone = formatPhone(rawPhone);
      } catch (e: any) {
        res.status(400).json({ error: e.message });
        return;
      }
      const record = await getSmsCode(phone);
      if (!record) {
        res.status(400).json({ error: 'No code sent to this phone number.' });
        return;
      }
      if (new Date() > new Date(record.expires_at)) {
        res.status(400).json({ error: 'The verification code has expired.' });
        return;
      }
      if (record.code !== code) {
        res.status(400).json({ error: 'Invalid verification code.' });
        return;
      }
      await removeSmsCode(phone);
      let user = await getUserByPhone(phone);
      if (!user) {
        user = await createUser(phone, "");
      }
      res.setHeader('Set-Cookie', [
        `authCode=${code}; Max-Age=${SMS_CODE_EXPIRY_DAYS * 24 * 60 * 60}; Path=/; HttpOnly`,
        `phone=${phone}; Max-Age=${SMS_CODE_EXPIRY_DAYS * 24 * 60 * 60}; Path=/; HttpOnly`
      ]);
      res.status(200).json({ success: true, user });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
    return;
  }

  res.status(400).json({ error: 'Invalid action parameter' });
};
