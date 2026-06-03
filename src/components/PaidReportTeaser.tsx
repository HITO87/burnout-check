'use client'
import { useState } from 'react'
import type { BurnoutType } from '@/lib/scoring'
import { Lock, FileText, Calendar, BookOpen, ChevronRight } from 'lucide-react'

const TEASER_CONTENT: Record<BurnoutType, {
  previewLines: string[]
  weeklyPlan: string[]
  insight: string
}> = {
  devotee: {
    previewLines: [
      'あなたの回答31問を分析した結果、「献身の人」タイプであることがわかりました。隠れた強みは「責任感と献身力」です。',
      'このタイプの方は、人のために動くときに最も力を発揮します。ただ、その力には一つの特徴があります——使いすぎても自分では気づきにくいこと。',
      'あなたの身体では今、HPA軸（ストレス応答システム）が過活動状態にあり、「止まれない」原因が意志の弱さではなく、身体のシステムにある可能性があります。',
      'レポートでは、この仕組みと、強みを長く活かすための具体的な方法を解説しています。',
    ],
    weeklyPlan: [
      '第1週：1日1つ「やらないこと」を決める練習',
      '第2週：「頼む」スキルを身につける3ステップ',
      '第3週：休むことへの罪悪感を手放すワーク',
      '第4週：新しいペースの定着と振り返り',
    ],
    insight: '献身の人が強みを長く活かすために最も重要なのは「止まる仕組み」を作ることです。',
  },
  perfectionist: {
    previewLines: [
      'あなたの回答31問を分析した結果、「こだわりの人」タイプであることがわかりました。隠れた強みは「妥協しない品質意識」です。',
      'このタイプの方は、高い基準で成果を出せる力を持っています。ただ、80点でも「まだ足りない」と感じるのは、性格ではなく身体の反応かもしれません。',
      'あなたの身体では今、コルチゾール（ストレスホルモン）が常に高い状態が続き、脳が「まだ終わっていない」と警報を出し続けています。',
      'レポートでは、この仕組みと、品質意識を長く活かすための具体的な方法を解説しています。',
    ],
    weeklyPlan: [
      '第1週：「80点でOK」の練習を1日1回',
      '第2週：完璧主義の裏にある恐れを特定する',
      '第3週：「十分に良い」の基準を再設定する',
      '第4週：新しい品質基準の定着と振り返り',
    ],
    insight: 'こだわりの人が強みを長く活かすには「完了の基準」を自分で決めることが鍵です。',
  },
  empath: {
    previewLines: [
      'あなたの回答31問を分析した結果、「共感の人」タイプであることがわかりました。隠れた強みは「深い共感力と観察力」です。',
      'このタイプの方は、人の気持ちを繊細に感じ取れる才能を持っています。ただ、他者の感情を自分のもののように受け取り、内側から静かに消耗しやすい特徴があります。',
      'あなたの身体では今、HPA軸の反応性が低下し、回復に必要なエネルギー自体が枯渇している可能性があります。',
      'レポートでは、この仕組みと、共感力を長く活かすための具体的な方法を解説しています。',
    ],
    weeklyPlan: [
      '第1週：1日1回「自分の感情に名前をつける」',
      '第2週：感情の出口を作る（書く・話す・動く）',
      '第3週：「自分と他人の感情の境界線」を引く',
      '第4週：セルフケアの定着と振り返り',
    ],
    insight: '共感の人が強みを長く活かすには「自分の感情にも名前をつける」習慣が鍵です。',
  },
  executor: {
    previewLines: [
      'あなたの回答31問を分析した結果、「実行の人」タイプであることがわかりました。隠れた強みは「自立心と実行力」です。',
      'このタイプの方は、自分で動いて結果を出す力を持っています。ただ、一人で全てを抱え込み、助けを求めることが苦手な傾向があります。',
      'あなたの身体では今、努力に見合った報酬（ドーパミン）が得られない状態が続き、「頑張っても無駄だ」という学習が進んでいる可能性があります。',
      'レポートでは、この仕組みと、実行力を長く活かすための具体的な方法を解説しています。',
    ],
    weeklyPlan: [
      '第1週：1日1つ「できたこと」を書き出す',
      '第2週：「助けを求める」練習を週1回',
      '第3週：評価を外部に求めない自己承認の方法',
      '第4週：持続可能なペースの定着と振り返り',
    ],
    insight: '実行の人が強みを長く活かすには「人に任せる練習」が鍵です。',
  },
  harmonizer: {
    previewLines: [
      'あなたの回答31問を分析した結果、「調和の人」タイプであることがわかりました。隠れた強みは「場を読む適応力」です。',
      'このタイプの方は、場の空気を整え、人間関係を円滑にする力を持っています。ただ、常に他者の感情を監視し続けることで、慢性的に疲弊しやすい傾向があります。',
      'あなたの身体では今、自律神経が慢性的に緊張状態にあり、完全にリラックスすることが難しくなっている可能性があります。',
      'レポートでは、この仕組みと、適応力を長く活かすための具体的な方法を解説しています。',
    ],
    weeklyPlan: [
      '第1週：1日1回「自分はどう感じているか」を確認',
      '第2週：小さな「No」を練習する（週2回）',
      '第3週：「相手に合わせない時間」を意図的に作る',
      '第4週：自分軸の定着と振り返り',
    ],
    insight: '調和の人が強みを長く活かすには「小さな本音を1つだけ言う」習慣が鍵です。',
  },
  seeker: {
    previewLines: [
      'あなたの回答31問を分析した結果、「探究の人」タイプであることがわかりました。隠れた強みは「知的好奇心と成長欲求」です。',
      'このタイプの方は、常に成長を求める強い向上心を持っています。ただ、今の環境に成長の実感がないと、能力が活かされていない焦燥感が蓄積しやすい特徴があります。',
      'あなたの身体では今、ドーパミン報酬系の反応が鈍化し、何をしても達成感を感じにくくなっている可能性があります。',
      'レポートでは、この仕組みと、成長欲求を長く活かすための具体的な方法を解説しています。',
    ],
    weeklyPlan: [
      '第1週：1日1つ「小さな新しいこと」を試す',
      '第2週：自分の価値観を再発見するワーク',
      '第3週：「熟達体験」を意図的に作る方法',
      '第4週：新しい刺激の習慣化と振り返り',
    ],
    insight: '探究の人が強みを長く活かすには「小さな新しい刺激」を日常に取り入れることが鍵です。',
  },
}

export default function PaidReportTeaser({ type, checkResultId }: { type: BurnoutType; checkResultId?: string }) {
  const [loading, setLoading] = useState(false)
  const content = TEASER_CONTENT[type]

  const handlePurchase = async () => {
    if (!checkResultId) return
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ check_result_id: checkResultId }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="p-5 border-b border-gray-50">
        <p className="text-xs text-gray-400 tracking-wider mb-1">YOUR PERSONAL REPORT</p>
        <h3 className="text-base font-bold text-gray-800">あなた専用の強みレポート</h3>
        <p className="text-xs text-gray-500 mt-1">あなたの回答31問すべてをAIが分析した、3,000文字以上のパーソナライズレポート</p>
      </div>

      {/* プレビュー：ぼかしなしで読める部分 */}
      <div className="px-5 pt-5">
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-[10px] text-gray-400 tracking-wider mb-2">レポートの一部を先読み</p>
          <div className="space-y-2">
            {content.previewLines.map((line, i) => (
              <p key={i} className="text-xs text-gray-700 leading-relaxed">{line}</p>
            ))}
          </div>
        </div>
      </div>

      {/* blur処理：30日プラン + 構造分析 */}
      <div className="relative px-5 pb-5">
        <div className="select-none" style={{ filter: 'blur(5px)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">30日間の実践プラン</p>
          </div>
          <div className="space-y-3 mb-5">
            {content.weeklyPlan.map((week, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-emerald-700">{i + 1}</span>
                </div>
                <p className="text-xs text-gray-600">{week}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">詳細な構造分析</p>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">{content.insight}</p>
        </div>

        {/* オーバーレイ + CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 bg-gradient-to-b from-white/0 via-white/80 to-white">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 text-center max-w-xs w-full mx-4">
            <p className="text-sm font-bold text-gray-800 mb-1">続きをレポートで読む</p>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              あなた専用の構造分析・30日間の実践プラン・おすすめ書籍が含まれます
            </p>
            <div className="space-y-1 mb-4 text-left">
              {[
                { icon: FileText, text: '3,000字以上の詳細レポート' },
                { icon: Calendar, text: '30日間の週次アクションプラン' },
                { icon: BookOpen, text: 'タイプ別おすすめ書籍3冊' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] text-gray-500">{text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handlePurchase}
              disabled={loading || !checkResultId}
              className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-full transition-colors shadow-lg shadow-emerald-200/50 disabled:opacity-50"
            >
              {loading ? '処理中...' : '強みレポートを受け取る（¥1,480）'}
              {!loading && <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
            </button>
            <p className="text-[10px] text-gray-400 mt-2">買い切り・即時発行・返品不可</p>
          </div>
        </div>
      </div>
    </div>
  )
}
