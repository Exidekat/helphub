#!/usr/bin/env node

/**
 * scripts/migrate.js
 *
 * Runs the SQL in migrations/001_init.sql against the DATABASE_URL.
 * Usage: bun run scripts/migrate.js    (or ./scripts/migrate.js)
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function migrate() {
  // Read SQL from the migration file
  const sqlPath = path.join(__dirname, '../migrations/001_init.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  // Connect to NeonDB
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  console.log('⏳ Running migrations...');
  await client.query(sql);
  console.log('✅ Migrations complete.');

  await client.end();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
