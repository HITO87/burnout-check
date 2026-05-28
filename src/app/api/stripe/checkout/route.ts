import { NextRequest } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  let body: { check_result_id?: string } = {}
  try { body = await req.json() } catch {
    return Response.json({ error: 'invalid body' }, { status: 400 })
  }

  if (!body.check_result_id) {
    return Response.json({ error: 'check_result_id required' }, { status: 400 })
  }

  const stripe = getStripe()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://burnout.hitone.app'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'jpy',
        product_data: {
          name: 'バーンアウト回復レポート',
          description: 'あなた専用の構造分析・30日間回復プラン・おすすめリソース',
        },
        unit_amount: 1480,
      },
      quantity: 1,
    }],
    metadata: { check_result_id: body.check_result_id },
    success_url: `${baseUrl}/report/${body.check_result_id}/view?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/result/${body.check_result_id}`,
  })

  return Response.json({ url: session.url })
}
