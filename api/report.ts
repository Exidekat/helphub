// api/report.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const { code_id, type, details } = req.body;
  if (
    typeof code_id !== 'string' ||
    (type !== 'safety' && type !== 'infrastructure') ||
    typeof details !== 'string'
  ) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  await db.query(
    `
    INSERT INTO reports (report_id, code_id, type, details)
    VALUES (gen_random_uuid(), $1, $2, $3)
    `,
    [code_id, type, details]
  );

  res.status(200).json({ success: true });
}
