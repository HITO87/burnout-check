import Anthropic from '@anthropic-ai/sdk'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pvjvdxqzfgzynttwsvkd.supabase.co'
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY

if (!SUPABASE_KEY || !ANTHROPIC_KEY) {
  console.error('Missing env vars. Run: source .env.local first or set them.')
  process.exit(1)
}

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

async function supabaseFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': options.prefer || '',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase error ${res.status}: ${text}`)
  }
  return res.json().catch(() => null)
}

async function main() {
  // 1. 全レポート取得
  console.log('Fetching reports...')
  const reports = await supabaseFetch(
    'paid_reports?status=eq.generated&report_content=not.is.null&select=id,report_content'
  )

  if (!reports?.length) {
    console.log('No reports found.')
    return
  }

  console.log(`Found ${reports.length} report(s).`)

  const anthropic = new Anthropic({ apiKey: ANTHROPIC_KEY })

  for (const report of reports) {
    console.log(`\nProcessing report ${report.id}...`)

    // 太字の密度を確認（段落数に対して少なければ処理する）
    const boldCount = (report.report_content.match(/\*\*/g) || []).length / 2
    const paragraphs = report.report_content.split('\n').filter(l => l.trim() && !l.startsWith('#')).length
    const ratio = boldCount / paragraphs
    if (ratio > 0.5) {
      console.log(`  Skipped: sufficient bold density (${boldCount} bolds / ${paragraphs} paragraphs = ${(ratio*100).toFixed(0)}%)`)
      continue
    }
    console.log(`  Low bold density: ${boldCount} bolds / ${paragraphs} paragraphs = ${(ratio*100).toFixed(0)}%. Processing...`)

    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 8000,
        system: ADD_BOLD_PROMPT,
        messages: [{ role: 'user', content: report.report_content }],
      })

      const updated = response.content[0]?.type === 'text' ? response.content[0].text : ''

      if (!updated || updated.length < report.report_content.length * 0.8) {
        console.log(`  Skipped: output too short (${updated.length} vs ${report.report_content.length})`)
        continue
      }

      const newBoldCount = (updated.match(/\*\*/g) || []).length / 2
      console.log(`  Bold markers: ${boldCount} -> ${newBoldCount}`)

      // 更新
      await supabaseFetch(
        `paid_reports?id=eq.${report.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ report_content: updated }),
          prefer: 'return=minimal',
        }
      )

      console.log(`  Updated!`)
    } catch (e) {
      console.error(`  Error: ${e.message}`)
    }
  }

  console.log('\nDone.')
}

main().catch(console.error)
