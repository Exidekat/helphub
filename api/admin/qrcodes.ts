// ./api/admin/qrcode.ts
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c; // in km
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, latitude, longitude, description, help_center_id } = req.body;

  if (
    typeof name !== "string" ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  // pick nearest help center if none provided
  let selectedCenter = help_center_id as string | undefined;
  if (!selectedCenter) {
    const { rows: centers } = await db.query<{
      center_id: string;
      latitude: number;
      longitude: number;
    }>(`SELECT center_id, latitude, longitude FROM help_centers`);
    let bestDist = Infinity;
    centers.forEach(c => {
      const d = haversine(latitude, longitude, c.latitude, c.longitude);
      if (d < bestDist) {
        bestDist = d;
        selectedCenter = c.center_id;
      }
    });
  }

  // 1) insert location
  const loc = await db.query(
    `INSERT INTO locations (name, latitude, longitude, description)
     VALUES ($1,$2,$3,$4)
     RETURNING id, name, latitude, longitude, description, created_at`,
    [name, latitude, longitude, description || null]
  );

  // 2) insert qr code
  const qr = await db.query(
    `INSERT INTO qr_codes (location_id)
     VALUES ($1)
     RETURNING code_id, created_at AS code_created`,
    [loc.rows[0].id]
  );

  res.status(200).json({
    code_id: qr.rows[0].code_id,
    code_created: qr.rows[0].code_created,
    location: loc.rows[0],
    help_center_id: selectedCenter,
  });
}
