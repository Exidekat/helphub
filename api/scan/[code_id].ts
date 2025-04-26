// api/scan/[code_id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code_id } = req.query;
  if (typeof code_id !== 'string') {
    return res.status(400).json({ error: 'Invalid code_id' });
  }

  // fetch location
  const { rows } = await db.query(
    `
    SELECT l.id, l.name, l.latitude, l.longitude, l.description
    FROM qr_codes q
    JOIN locations l ON l.id = q.location_id
    WHERE q.code_id = $1
    `,
    [code_id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: 'QR code not found' });
  }

  const location = rows[0];
  res.status(200).json({
    location,
    actions: ['911', 'nonEmergency', 'findCenter', 'report'],
  });
}
