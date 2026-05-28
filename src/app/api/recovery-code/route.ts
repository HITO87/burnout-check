import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'HIT-'
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// GET: コードで結果を取得（HITONE側から呼ぶ）
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return Response.json({ error: 'code required' }, { status: 400 })

  const supabase = await createClient()
  const { data } = await supabase
    .from('recovery_codes')
    .select('*, check_results(*)')
    .eq('code', code)
    .maybeSingle()

  if (!data) return Response.json({ error: 'invalid code' }, { status: 404 })
  return Response.json({ recovery: data })
}

// POST: 新規コード発行（Webhook内から呼ぶ or レポート閲覧ページから）
export async function POST(req: NextRequest) {
  let body: { check_result_id?: string; paid_report_id?: string } = {}
  try { body = await req.json() } catch {
    return Response.json({ error: 'invalid body' }, { status: 400 })
  }

  if (!body.check_result_id) return Response.json({ error: 'check_result_id required' }, { status: 400 })

  const supabase = await createClient()

  // 既存コードがあればそれを返す
  const { data: existing } = await supabase
    .from('recovery_codes')
    .select('code')
    .eq('check_result_id', body.check_result_id)
    .maybeSingle()

  if (existing) return Response.json({ code: existing.code })

  // 新規生成
  const code = generateCode()
  const { error } = await supabase.from('recovery_codes').insert({
    code,
    check_result_id: body.check_result_id,
    paid_report_id: body.paid_report_id ?? null,
  })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ code })
}
