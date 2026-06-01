import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const TEST_DATA = [
  {
    type: 'devotee',
    typeName: '背負いすぎる献身家',
    total: 72, personal: 78, work: 75, interpersonal: 62,
    frenetic: 5.8, underchallenged: 2.3, wornout: 4.2,
    secondary: 'perfectionist', severity: 'high',
  },
  {
    type: 'perfectionist',
    typeName: '求めすぎる職人気質',
    total: 65, personal: 60, work: 80, interpersonal: 45,
    frenetic: 6.2, underchallenged: 3.1, wornout: 3.5,
    secondary: 'devotee', severity: 'high',
  },
  {
    type: 'empath',
    typeName: '溜め込みすぎる共感者',
    total: 58, personal: 68, work: 52, interpersonal: 55,
    frenetic: 2.8, underchallenged: 3.0, wornout: 5.5,
    secondary: 'harmonizer', severity: 'moderate',
  },
  {
    type: 'executor',
    typeName: '抱え込みすぎる実行者',
    total: 70, personal: 65, work: 82, interpersonal: 58,
    frenetic: 3.5, underchallenged: 2.0, wornout: 6.0,
    secondary: null, severity: 'high',
  },
  {
    type: 'harmonizer',
    typeName: '合わせすぎる調和者',
    total: 55, personal: 50, work: 48, interpersonal: 72,
    frenetic: 3.0, underchallenged: 3.5, wornout: 4.0,
    secondary: 'empath', severity: 'moderate',
  },
  {
    type: 'seeker',
    typeName: '考えすぎる探究者',
    total: 48, personal: 42, work: 60, interpersonal: 35,
    frenetic: 2.5, underchallenged: 6.0, wornout: 2.8,
    secondary: null, severity: 'moderate',
  },
]

async function main() {
  console.log('テストデータ投入開始...\n')

  const links: string[] = []

  for (const data of TEST_DATA) {
    // 1. check_results にテストデータ挿入
    const dummyAnswers: Record<string, number> = {}
    for (let i = 1; i <= 31; i++) dummyAnswers[`q${i}`] = 4

    const { data: checkResult, error: checkError } = await supabase
      .from('check_results')
      .insert({
        answers: dummyAnswers,
        total_score: data.total,
        personal_score: data.personal,
        work_score: data.work,
        interpersonal_score: data.interpersonal,
        primary_type: data.type,
        secondary_type: data.secondary,
        frenetic_score: data.frenetic,
        underchallenged_score: data.underchallenged,
        wornout_score: data.wornout,
        severity: data.severity,
      })
      .select('id')
      .single()

    if (checkError) {
      console.error(`❌ check_results挿入エラー (${data.type}):`, checkError.message)
      continue
    }

    // 2. レポートファイル読み込み
    const reportContent = readFileSync(`/tmp/burnout_report_${data.type}.md`, 'utf-8')
    // 先頭のタイトル行を除去
    const content = reportContent.split('\n').slice(2).join('\n').trim()

    // 3. paid_reports にレポート挿入
    const { error: reportError } = await supabase
      .from('paid_reports')
      .insert({
        check_result_id: checkResult.id,
        email: 'test@example.com',
        stripe_payment_id: `pi_test_${data.type}`,
        report_content: content,
        status: 'generated',
      })

    if (reportError) {
      console.error(`❌ paid_reports挿入エラー (${data.type}):`, reportError.message)
      continue
    }

    const url = `https://burnout.hitone.app/report/${checkResult.id}/view`
    links.push(`${data.typeName}: ${url}`)
    console.log(`✅ ${data.typeName} → ${url}`)
  }

  console.log('\n' + '='.repeat(60))
  console.log('全リンク一覧:')
  console.log('='.repeat(60))
  links.forEach(l => console.log(l))
}

main()
