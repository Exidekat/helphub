// ./scripts/seed.js
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  // 1) Core help centers
  console.log('⏳ Seeding help_centers…');
  await client.query(`
    INSERT INTO help_centers (name, phone, latitude, longitude, hours)
    VALUES
      ('Downtown Emergency Shelter', '408-123-4567', 37.3352, -121.8811, '24/7'),
      ('East San Jose Clinic',       '408-234-5678', 37.3302, -121.8801, 'Mon–Fri 8am–6pm'),
      ('Westside Family Center',     '408-345-6789', 37.3393, -121.8932, 'Mon–Sat 9am–5pm')
    ON CONFLICT (center_id) DO NOTHING;
  `);

  // 2) Campus urgent-care help center
  console.log('⏳ Seeding SJSU Student Health Center…');
  await client.query(`
    INSERT INTO help_centers (name, phone, latitude, longitude, hours)
    VALUES
      ('SJSU Student Health Center', '408-924-6122', 37.3350, -121.8855, 'Mon–Fri 8am–5pm')
    ON CONFLICT (center_id) DO NOTHING;
  `);

  // 3) Sample Park Entrance (your existing example)
  console.log('⏳ Seeding Sample Park Entrance…');
  await client.query(`
    INSERT INTO locations (name, latitude, longitude, description)
    SELECT
      'Sample Park Entrance',
      37.3337,
      -121.8907,
      'Main entrance at Sample Park'
    WHERE NOT EXISTS (
      SELECT 1 FROM locations WHERE name = 'Sample Park Entrance'
    );
  `);

  console.log('⏳ Seeding QR for Sample Park Entrance…');
  await client.query(`
    INSERT INTO qr_codes (code_id, location_id)
    SELECT
      gen_random_uuid(),
      l.id
    FROM locations l
    WHERE l.name = 'Sample Park Entrance'
      AND NOT EXISTS (
        SELECT 1
        FROM qr_codes q
        WHERE q.location_id = l.id
      );
  `);

  // 4) Student Union Building at SJSU
  console.log('⏳ Seeding Student Union Building location…');
  await client.query(`
    INSERT INTO locations (name, latitude, longitude, description)
    SELECT
      'Student Union Building',
      37.3353,
      -121.8855,
      'Student Union at San Jose State University'
    WHERE NOT EXISTS (
      SELECT 1 FROM locations WHERE name = 'Student Union Building'
    );
  `);

  console.log('⏳ Seeding QR for Student Union Building…');
  await client.query(`
    INSERT INTO qr_codes (code_id, location_id)
    SELECT
      gen_random_uuid(),
      l.id
    FROM locations l
    WHERE l.name = 'Student Union Building'
      AND NOT EXISTS (
        SELECT 1
        FROM qr_codes q
        WHERE q.location_id = l.id
      );
  `);

  console.log('✅ Seed complete.');
  await client.end();
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
