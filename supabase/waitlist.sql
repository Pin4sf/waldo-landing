-- Waldo waitlist table
-- Run this in your Supabase project → SQL Editor

CREATE TABLE IF NOT EXISTS waitlist (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT NOT NULL UNIQUE,
  source     TEXT NOT NULL DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Only the service role can insert/read — no anon access
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- No public policies: all access goes through the service role key
-- (used server-side in actions/submit-email.ts, never exposed to the browser)
