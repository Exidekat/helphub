-- migrations/001_init.sql

-- 1) Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2) locations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3) qr_codes table
CREATE TABLE IF NOT EXISTS qr_codes (
  code_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4) report_type enum
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'report_type') THEN
    CREATE TYPE report_type AS ENUM ('safety','infrastructure');
  END IF;
END $$;

-- 5) reports table
CREATE TABLE IF NOT EXISTS reports (
  report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code_id   UUID NOT NULL REFERENCES qr_codes(code_id) ON DELETE CASCADE,
  type      report_type NOT NULL,
  details   TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6) help_centers table
CREATE TABLE IF NOT EXISTS help_centers (
  center_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  phone      TEXT,
  latitude   DOUBLE PRECISION,
  longitude  DOUBLE PRECISION,
  hours      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
