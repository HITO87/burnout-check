const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\\n/g, '')
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function query(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` },
  })
  return res.json()
}

// 全チェック結果を取得（日時順）
const results = await query('check_results?select=id,created_at,primary_type,total_score,severity&order=created_at.desc&limit=100')

console.log(`\n=== HITONE チェック完了数 ===`)
console.log(`総数: ${results.length}件\n`)

// 日別集計
const byDate = {}
for (const r of results) {
  const date = r.created_at.slice(0, 10)
  byDate[date] = (byDate[date] || 0) + 1
}

console.log('--- 日別チェック完了数 ---')
for (const [date, count] of Object.entries(byDate).sort()) {
  console.log(`${date}: ${count}件`)
}

// 直近24時間
const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
const recent = results.filter(r => r.created_at > yesterday)
console.log(`\n直近24時間: ${recent.length}件`)

// 直近48時間（診断メーカー公開後）
const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
const recent48 = results.filter(r => r.created_at > twoDaysAgo)
console.log(`直近48時間: ${recent48.length}件`)

// タイプ別
const byType = {}
for (const r of results) {
  byType[r.primary_type] = (byType[r.primary_type] || 0) + 1
}
console.log('\n--- タイプ別 ---')
for (const [type, count] of Object.entries(byType).sort((a, b) => b[1] - a[1])) {
  console.log(`${type}: ${count}件`)
}
