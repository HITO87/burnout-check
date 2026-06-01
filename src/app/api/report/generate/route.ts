import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAI, REPORT_SYSTEM_PROMPT } from '@/lib/openai'
import { TYPE_INFO } from '@/lib/type-descriptions'
import type { BurnoutType } from '@/lib/scoring'

export const maxDuration = 120

// POST: レポート生成（無料）
export async function POST(req: NextRequest) {
  let body: { check_result_id?: string } = {}
  try { body = await req.json() } catch {
    return Response.json({ error: 'invalid body' }, { status: 400 })
  }

  if (!body.check_result_id) {
    return Response.json({ error: 'check_result_id required' }, { status: 400 })
  }

  const supabase = await createClient()

  // 既にレポートがあればそれを返す
  const { data: existing } = await supabase
    .from('paid_reports')
    .select('id, report_content, status')
    .eq('check_result_id', body.check_result_id)
    .eq('status', 'generated')
    .maybeSingle()

  if (existing?.report_content) {
    return Response.json({ reportId: existing.id, status: 'generated' })
  }

  // チェック結果を取得
  const { data: result } = await supabase
    .from('check_results')
    .select('*')
    .eq('id', body.check_result_id)
    .maybeSingle()

  if (!result) {
    return Response.json({ error: 'check result not found' }, { status: 404 })
  }

  // レポートレコードを作成（pending）
  const { data: report } = await supabase.from('paid_reports').insert({
    check_result_id: body.check_result_id,
    email: 'free@hitone.app',
    stripe_payment_id: 'free_report',
    status: 'pending',
  }).select('id').single()

  if (!report) {
    return Response.json({ error: 'failed to create report' }, { status: 500 })
  }

  // Claude Sonnetでレポート生成
  try {
    const typeName = TYPE_INFO[result.primary_type as BurnoutType]?.name ?? result.primary_type
    const secondaryName = result.secondary_type ? (TYPE_INFO[result.secondary_type as BurnoutType]?.name ?? '') : 'なし'

    const anthropic = getAI()
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 6000,
      system: REPORT_SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: `【入力データ】
・総合燃え尽き度スコア: ${result.total_score}/100
・個人的バーンアウト: ${result.personal_score}/100
・仕事関連バーンアウト: ${result.work_score}/100
・対人関連バーンアウト: ${result.interpersonal_score}/100
・プライマリタイプ: ${typeName}
・セカンダリタイプ: ${secondaryName}
・熱狂型スコア: ${result.frenetic_score}/7
・退屈型スコア: ${result.underchallenged_score}/7
・消耗型スコア: ${result.wornout_score}/7
・重症度: ${result.severity}

上記データに基づいてパーソナライズされた回復レポートを生成してください。`,
      }],
    })

    const reportContent = response.content[0]?.type === 'text' ? response.content[0].text : ''

    await supabase.from('paid_reports').update({
      report_content: reportContent,
      status: 'generated',
    }).eq('id', report.id)

    return Response.json({ reportId: report.id, status: 'generated' })
  } catch (e) {
    console.error('Report generation error:', e)
    await supabase.from('paid_reports').update({ status: 'error' }).eq('id', report.id)
    return Response.json({ error: 'generation failed' }, { status: 500 })
  }
}
