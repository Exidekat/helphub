// api/qrcodes.ts
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../lib/db";

type Report = {
  report_id: string;
  type: string;
  details: string;
  created_at: Date;
};

type Location = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string | null;
  created_at: Date;
};

type QRCodeRecord = {
  code_id: string;
  code_created: Date;
  location: Location;
  reports: Report[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QRCodeRecord[] | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const result = await db.query(
      `
      SELECT
        q.code_id,
        q.created_at AS code_created,
        json_build_object(
          'id', l.id,
          'name', l.name,
          'latitude', l.latitude,
          'longitude', l.longitude,
          'description', l.description,
          'created_at', l.created_at
        ) AS location,
        COALESCE(
          json_agg(
            json_build_object(
              'report_id', r.report_id,
              'type', r.type,
              'details', r.details,
              'created_at', r.created_at
            )
          ) FILTER (WHERE r.report_id IS NOT NULL),
          '[]'
        ) AS reports
      FROM qr_codes q
      JOIN locations l ON q.location_id = l.id
      LEFT JOIN reports r ON r.code_id = q.code_id
      GROUP BY
        q.code_id,
        q.created_at,
        l.id, l.name, l.latitude, l.longitude, l.description, l.created_at
      ORDER BY code_created DESC;
      `
    );

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ [api/qrcodes] error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
