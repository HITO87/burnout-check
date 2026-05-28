-- HITONE バーンアウトチェック用テーブル
-- 既存Supabaseプロジェクト（pvjvdxqzfgzynttwsvkd）のSQL Editorで実行

CREATE TABLE IF NOT EXISTS check_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  answers JSONB NOT NULL,
  total_score DECIMAL NOT NULL,
  personal_score DECIMAL NOT NULL,
  work_score DECIMAL NOT NULL,
  interpersonal_score DECIMAL NOT NULL,
  primary_type TEXT NOT NULL,
  secondary_type TEXT,
  frenetic_score DECIMAL NOT NULL,
  underchallenged_score DECIMAL NOT NULL,
  wornout_score DECIMAL NOT NULL,
  severity TEXT NOT NULL
);

ALTER TABLE check_results ENABLE ROW LEVEL SECURITY;

-- 匿名INSERTを許可（認証不要）
CREATE POLICY "Anyone can insert check results"
  ON check_results FOR INSERT
  WITH CHECK (true);

-- IDを知っている人だけSELECT可能
CREATE POLICY "Anyone can read check results by id"
  ON check_results FOR SELECT
  USING (true);
