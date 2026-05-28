import { NextRequest } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { getOpenAI, REPORT_SYSTEM_PROMPT } from '@/lib/openai'
import { TYPE_INFO } from '@/lib/type-descriptions'
import type { BurnoutType } from '@/lib/scoring'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  if (!sig) return Response.json({ error: 'no signature' }, { status: 400 })

  const stripe = getStripe()
  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return Response.json({ error: 'invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const checkResultId = session.metadata?.check_result_id
    const email = session.customer_details?.email
    if (!checkResultId || !email) return Response.json({ ok: true })

    const supabase = await createClient()

    // チェック結果を取得
    const { data: result } = await supabase.from('check_results').select('*').eq('id', checkResultId).maybeSingle()
    if (!result) return Response.json({ ok: true })

    // paid_reportsにレコード作成
    const { data: report } = await supabase.from('paid_reports').insert({
      check_result_id: checkResultId,
      email,
      stripe_payment_id: session.payment_intent as string,
      status: 'pending',
    }).select('id').single()

    if (!report) return Response.json({ ok: true })

    // GPT-4o-miniでレポート生成
    try {
      const typeName = TYPE_INFO[result.primary_type as BurnoutType]?.name ?? result.primary_type
      const secondaryName = result.secondary_type ? (TYPE_INFO[result.secondary_type as BurnoutType]?.name ?? '') : 'なし'

      const openai = getOpenAI()
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        max_tokens: 4000,
        messages: [
          { role: 'system', content: REPORT_SYSTEM_PROMPT },
          {
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
          },
        ],
      })

      const reportContent = completion.choices[0]?.message?.content ?? ''

      await supabase.from('paid_reports').update({
        report_content: reportContent,
        status: 'generated',
      }).eq('id', report.id)
    } catch (e) {
      console.error('Report generation error:', e)
      await supabase.from('paid_reports').update({ status: 'error' }).eq('id', report.id)
    }
  }

  return Response.json({ ok: true })
}
