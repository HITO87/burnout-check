-- Phase 3: HITONE連携用 回復コード
-- Supabase SQL Editorで実行

CREATE TABLE IF NOT EXISTS recovery_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  check_result_id UUID REFERENCES check_results(id),
  paid_report_id UUID REFERENCES paid_reports(id),
  redeemed_by UUID REFERENCES auth.users(id),
  redeemed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS recovery_codes_code_idx ON recovery_codes(code);

ALTER TABLE recovery_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read recovery codes by code"
  ON recovery_codes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can redeem"
  ON recovery_codes FOR UPDATE
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- user_profilesに診断結果連携カラム追加
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS burnout_type TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS burnout_score INTEGER DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS burnout_checked_at TIMESTAMPTZ DEFAULT NULL;
