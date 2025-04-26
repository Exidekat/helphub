// scripts/seed.js
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

  console.log('✅ Seed complete.');
  await client.end();
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
