// api/centers.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { rows } = await db.query(
        `
    SELECT center_id AS id, name, phone, latitude, longitude, hours
    FROM help_centers
    ORDER BY name
    `
    );
    res.status(200).json(rows);
}
