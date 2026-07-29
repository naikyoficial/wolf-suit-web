-- ══════════════════════════════════════════════════════════
--  SUITWOLF OS — Tablas en proyecto Supabase compartido
--  Prefijo sw_ para separar de otras apps del mismo proyecto
--  Pegar en: Supabase → SQL Editor → Run
-- ══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS sw_leads (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL DEFAULT '',
  company           TEXT NOT NULL DEFAULT '',
  email             TEXT NOT NULL DEFAULT '',
  phone             TEXT NOT NULL DEFAULT '',
  channel           TEXT NOT NULL DEFAULT '',
  status            TEXT NOT NULL DEFAULT 'nuevo',
  service           TEXT NOT NULL DEFAULT '',
  estimated_value   NUMERIC NOT NULL DEFAULT 0,
  notes             TEXT NOT NULL DEFAULT '',
  next_action       TEXT NOT NULL DEFAULT '',
  next_action_date  DATE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sw_projects (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name          TEXT NOT NULL DEFAULT '',
  company              TEXT NOT NULL DEFAULT '',
  email                TEXT NOT NULL DEFAULT '',
  service              TEXT NOT NULL DEFAULT '',
  description          TEXT NOT NULL DEFAULT '',
  total_value          NUMERIC NOT NULL DEFAULT 0,
  paid_amount          NUMERIC NOT NULL DEFAULT 0,
  start_date           DATE,
  estimated_end_date   DATE,
  status               TEXT NOT NULL DEFAULT 'activo',
  notes                TEXT NOT NULL DEFAULT '',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sw_stages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID NOT NULL REFERENCES sw_projects(id) ON DELETE CASCADE,
  name        TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'pendiente',
  due_date    DATE,
  position    INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sw_deliverables (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_id   UUID NOT NULL REFERENCES sw_stages(id) ON DELETE CASCADE,
  name       TEXT NOT NULL DEFAULT '',
  url        TEXT NOT NULL DEFAULT '',
  done       BOOLEAN NOT NULL DEFAULT FALSE,
  position   INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
