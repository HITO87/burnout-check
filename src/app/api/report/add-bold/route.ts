import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAI } from '@/lib/openai'

export const maxDuration = 300

const ADD_BOLD_PROMPT = `あなたはテキストエディターです。以下のMarkdownテキストに太字（**太字**）を追加してください。

【ルール】
・文章の内容、構成、語順、改行は一切変えない。太字マーカーの追加のみ行う
・各段落に1〜2箇所、最も重要なフレーズを太字にする
・太字だけを拾い読みすればレポート全体の骨格が分かるようにする
・以下は必ず太字にする：
  - タイプ名（例：溜め込みすぎる共感者）
  - 信念の言語化（例：「自分が〜」という引用的フレーズ）
  - 身体の仕組みの結論（例：回復システムが働きを失いかけている）
  - 具体的な行動指示（例：感じた感情を5秒だけ自分に許す）
  - 数字の解釈の核心部分
  - 「これは〜ではなく〜です」のような重要な再定義
・見出し（##, ###）はそのまま。見出し内には太字を追加しない
・既に太字になっている部分はそのまま維持する
・太字がゼロの段落は作らない（ただし1行だけの短い段落は除く）

テキストのみを出力してください。説明や前置きは不要です。`

// POST: 既存レポートに太字を追加
export async function POST(req: NextRequest) {
  const { secret, report_id } = await req.json().catch(() => ({}))

  // 簡易認証
  if (secret !== process.env.ANTHROPIC_API_KEY?.slice(-8)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()

  // 対象レポートを取得
  let query = supabase
    .from('paid_reports')
    .select('id, report_content')
    .eq('status', 'generated')
    .not('report_content', 'is', null)

  if (report_id) {
    query = query.eq('id', report_id)
  }

  const { data: reports, error } = await query

  if (error || !reports?.length) {
    return Response.json({ error: 'no reports found', detail: error }, { status: 404 })
  }

  const anthropic = getAI()
  const results: { id: string; status: string }[] = []

  for (const report of reports) {
    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 8000,
        system: ADD_BOLD_PROMPT,
        messages: [{
          role: 'user',
          content: report.report_content,
        }],
      })

      const updatedContent = response.content[0]?.type === 'text' ? response.content[0].text : ''

      if (!updatedContent || updatedContent.length < report.report_content.length * 0.8) {
        results.push({ id: report.id, status: 'skipped: content too short' })
        continue
      }

      const { error: updateError } = await supabase
        .from('paid_reports')
        .update({ report_content: updatedContent })
        .eq('id', report.id)

      results.push({
        id: report.id,
        status: updateError ? `error: ${updateError.message}` : 'updated',
      })
    } catch (e) {
      results.push({ id: report.id, status: `error: ${e}` })
    }
  }

  return Response.json({ results })
}
