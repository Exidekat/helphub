// ./scripts/seed.js
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  console.log('⏳ Seeding help_centers...');
  await client.query(`
    INSERT INTO help_centers (name, phone, latitude, longitude, hours)
    VALUES
      ('Downtown Emergency Shelter', '408-123-4567', 37.3352, -121.8811, '24/7'),
      ('East San Jose Clinic',       '408-234-5678', 37.3302, -121.8801, 'Mon–Fri 8am–6pm'),
      ('Westside Family Center',     '408-345-6789', 37.3393, -121.8932, 'Mon–Sat 9am–5pm')
    ON CONFLICT DO NOTHING;
  `);

  console.log('⏳ Seeding a sample location + QR code...');
  // 1) Create a sample location if it doesn't exist
  await client.query(`
    INSERT INTO locations (id, name, latitude, longitude, description)
    SELECT
      gen_random_uuid(),
      'Sample Park Entrance',
      37.3337,
      -121.8907,
      'Main entrance at Sample Park'
    WHERE NOT EXISTS (
      SELECT 1 FROM locations WHERE name = 'Sample Park Entrance'
    );
  `);

  // 2) Create one QR code for that location
  await client.query(`
    INSERT INTO qr_codes (code_id, location_id)
    SELECT
      gen_random_uuid(),
      id
    FROM locations
    WHERE name = 'Sample Park Entrance'
      AND NOT EXISTS (
        SELECT 1
        FROM qr_codes q
        JOIN locations l ON q.location_id = l.id
        WHERE l.name = 'Sample Park Entrance'
      );
  `);

  console.log('✅ Seed complete.');
  await client.end();
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
