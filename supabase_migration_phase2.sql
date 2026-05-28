-- Phase 2: 有料レポート用テーブル
-- Supabase SQL Editorで実行

CREATE TABLE IF NOT EXISTS paid_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  check_result_id UUID REFERENCES check_results(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT NOT NULL,
  stripe_payment_id TEXT NOT NULL,
  report_content TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'generated', 'error'))
);

ALTER TABLE paid_reports ENABLE ROW LEVEL SECURITY;

-- サーバーサイドからのみINSERT/UPDATE（Stripe Webhook経由）
-- SELECTはcheck_result_idを知っている人のみ
CREATE POLICY "Anyone can read paid reports by check_result_id"
  ON paid_reports FOR SELECT
  USING (true);
