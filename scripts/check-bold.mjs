const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\\n/g, '')
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const res = await fetch(`${SUPABASE_URL}/rest/v1/paid_reports?status=eq.generated&select=id,report_content&limit=20`, {
  headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` },
})
const reports = await res.json()

for (const r of reports) {
  const boldMatches = r.report_content.match(/\*\*(.+?)\*\*/g) || []
  const totalParagraphs = r.report_content.split('\n').filter(l => l.trim() && !l.startsWith('#')).length
  console.log(`\n--- Report ${r.id.slice(0,8)} ---`)
  console.log(`Paragraphs: ${totalParagraphs}, Bold phrases: ${boldMatches.length}`)
  console.log(`Samples:`, boldMatches.slice(0, 5).join(' | '))

  // Check chapter 1 specifically
  const ch1 = r.report_content.split('## 第2章')[0] || ''
  const ch1Bolds = ch1.match(/\*\*(.+?)\*\*/g) || []
  const ch1Paras = ch1.split('\n').filter(l => l.trim() && !l.startsWith('#')).length
  console.log(`Chapter 1: ${ch1Paras} paragraphs, ${ch1Bolds.length} bold phrases`)
}
