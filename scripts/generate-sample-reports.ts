import Anthropic from '@anthropic-ai/sdk'

const REPORT_SYSTEM_PROMPT = `あなたは科学的根拠に基づいたバーンアウト回復の専門家です。
以下のユーザーのセルフチェック結果データに基づいて、パーソナライズされた回復レポートを生成してください。

【守るべきルール】
・「診断」という言葉は使わない。「セルフチェック」「傾向分析」を使う
・「あなたはバーンアウトです」とは言わない。「バーンアウトの傾向が見られます」を使う
・医学的なアドバイスはしない。生活習慣の改善提案に留める
・「つらい状況が続く場合は専門機関へ」を必ず含める
・引用する研究は実在するものだけを使う
・トーンは温かく、寄り添いながらも科学的な説得力を持たせる
・マークダウン見出し（##）を使って章立てする

【レポートの章構成】

## 第1章：あなたの燃え尽きの構造分析
・総合スコアの解釈
・3つの下位尺度のバランス分析
・あなたのタイプの詳細解説（1,000文字程度）
・「あなたがこのタイプになった背景として考えられること」

## 第2章：あなたの身体で起きていること
・タイプ別の生理学的メカニズム解説
・自律神経系への影響
・睡眠への影響
・「これは性格の問題ではなく、身体の反応です」というメッセージ

## 第3章：30日間の回復ロードマップ
・第1週（応急処置）: タイプ別の最優先アクション
・第2週（土台づくり）: 睡眠・運動・食事の具体的な改善ステップ
・第3週（パターンの書き換え）: タイプ別の認知・行動パターンへの介入
・第4週（定着と振り返り）: 変化の確認と次のステップ

## 第4章：あなたに合った回復リソース
・タイプ別おすすめ書籍（3冊・実在するもの）
・タイプ別おすすめ習慣（3つ）

## 第5章：次のステップ
・定期的にセルフチェックを受けることの推奨
・スコアが高い場合の専門機関案内

レポートは日本語で、合計3,000〜4,000文字で生成してください。`

const SAMPLE_DATA = [
  {
    type: 'devotee',
    typeName: '背負いすぎる献身家',
    total: 72, personal: 78, work: 75, interpersonal: 62,
    frenetic: 5.8, underchallenged: 2.3, wornout: 4.2,
    secondary: '求めすぎる職人気質', severity: 'high',
  },
  {
    type: 'perfectionist',
    typeName: '求めすぎる職人気質',
    total: 65, personal: 60, work: 80, interpersonal: 45,
    frenetic: 6.2, underchallenged: 3.1, wornout: 3.5,
    secondary: '背負いすぎる献身家', severity: 'high',
  },
  {
    type: 'empath',
    typeName: '溜め込みすぎる共感者',
    total: 58, personal: 68, work: 52, interpersonal: 55,
    frenetic: 2.8, underchallenged: 3.0, wornout: 5.5,
    secondary: '合わせすぎる調和者', severity: 'moderate',
  },
  {
    type: 'executor',
    typeName: '抱え込みすぎる実行者',
    total: 70, personal: 65, work: 82, interpersonal: 58,
    frenetic: 3.5, underchallenged: 2.0, wornout: 6.0,
    secondary: 'なし', severity: 'high',
  },
  {
    type: 'harmonizer',
    typeName: '合わせすぎる調和者',
    total: 55, personal: 50, work: 48, interpersonal: 72,
    frenetic: 3.0, underchallenged: 3.5, wornout: 4.0,
    secondary: '溜め込みすぎる共感者', severity: 'moderate',
  },
  {
    type: 'seeker',
    typeName: '考えすぎる探究者',
    total: 48, personal: 42, work: 60, interpersonal: 35,
    frenetic: 2.5, underchallenged: 6.0, wornout: 2.8,
    secondary: 'なし', severity: 'moderate',
  },
]

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not set')
    process.exit(1)
  }
  const anthropic = new Anthropic({ apiKey })

  for (const data of SAMPLE_DATA) {
    console.log(`\n${'='.repeat(60)}`)
    console.log(`生成中: ${data.typeName}（${data.type}）`)
    console.log(`${'='.repeat(60)}\n`)

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4000,
      system: REPORT_SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: `【入力データ】
・総合燃え尽き度スコア: ${data.total}/100
・個人的バーンアウト: ${data.personal}/100
・仕事関連バーンアウト: ${data.work}/100
・対人関連バーンアウト: ${data.interpersonal}/100
・プライマリタイプ: ${data.typeName}
・セカンダリタイプ: ${data.secondary}
・熱狂型スコア: ${data.frenetic}/7
・退屈型スコア: ${data.underchallenged}/7
・消耗型スコア: ${data.wornout}/7
・重症度: ${data.severity}

上記データに基づいてパーソナライズされた回復レポートを生成してください。`,
      }],
    })

    const text = response.content[0]?.type === 'text' ? response.content[0].text : ''
    const charCount = text.length

    // ファイルに保存
    const fs = await import('fs')
    const path = `/tmp/burnout_report_${data.type}.md`
    fs.writeFileSync(path, `# ${data.typeName}のレポート（サンプル）\n\n${text}`)
    console.log(text.substring(0, 500) + '...')
    console.log(`\n📝 ${charCount}文字 → ${path}`)
  }

  console.log('\n\n✅ 全6タイプのサンプルレポート生成完了')
  console.log('保存先: /tmp/burnout_report_*.md')
}

main()
