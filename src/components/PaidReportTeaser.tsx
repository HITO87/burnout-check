'use client'
import { useState } from 'react'
import type { BurnoutType } from '@/lib/scoring'
import { Lock, FileText, Calendar, BookOpen } from 'lucide-react'

const TEASER_CONTENT: Record<BurnoutType, { weeklyPlan: string[]; insight: string }> = {
  devotee: {
    weeklyPlan: [
      '第1週：1日1つ「やらないこと」を決める練習',
      '第2週：「頼む」スキルを身につける3ステップ',
      '第3週：休むことへの罪悪感を手放すワーク',
      '第4週：新しいペースの定着と振り返り',
    ],
    insight: '献身家の回復で最も重要なのは「止まる仕組み」を作ることです。あなたの献身力は素晴らしい強みですが...',
  },
  perfectionist: {
    weeklyPlan: [
      '第1週：「80点でOK」の練習を1日1回',
      '第2週：完璧主義の裏にある恐れを特定する',
      '第3週：「十分に良い」の基準を再設定する',
      '第4週：新しい品質基準の定着と振り返り',
    ],
    insight: '職人気質の回復では「完璧でなくても価値がある」を身体で理解することが鍵です。頭では分かっていても...',
  },
  empath: {
    weeklyPlan: [
      '第1週：1日1回「自分の感情に名前をつける」',
      '第2週：感情の出口を作る（書く・話す・動く）',
      '第3週：「自分と他人の感情の境界線」を引く',
      '第4週：セルフケアの定着と振り返り',
    ],
    insight: '共感者の回復は「感情を出すこと」から始まります。溜め込んだ感情はエネルギーを消耗し続けます...',
  },
  executor: {
    weeklyPlan: [
      '第1週：1日1つ「できたこと」を書き出す',
      '第2週：「助けを求める」練習を週1回',
      '第3週：評価を外部に求めない自己承認の方法',
      '第4週：持続可能なペースの定着と振り返り',
    ],
    insight: '実行者の回復は「一人で全部やらなくていい」を受け入れることから始まります。あなたの実行力は...',
  },
  harmonizer: {
    weeklyPlan: [
      '第1週：1日1回「自分はどう感じているか」を確認',
      '第2週：小さな「No」を練習する（週2回）',
      '第3週：「相手に合わせない時間」を意図的に作る',
      '第4週：自分軸の定着と振り返り',
    ],
    insight: '調和者の回復の鍵は「自分の感情に気づくこと」です。他者に合わせ続けると、自分が何を感じているか...',
  },
  seeker: {
    weeklyPlan: [
      '第1週：1日1つ「小さな新しいこと」を試す',
      '第2週：自分の価値観を再発見するワーク',
      '第3週：「熟達体験」を意図的に作る方法',
      '第4週：新しい刺激の習慣化と振り返り',
    ],
    insight: '探究者の回復の鍵は「小さな成功体験」の積み重ねです。大きな変化は必要ありません。毎日の中に...',
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
        <p className="text-xs text-gray-400 tracking-wider mb-1">RECOVERY ROADMAP</p>
        <h3 className="text-base font-bold text-gray-800">あなた専用の回復ロードマップ</h3>
      </div>

      {/* 見えているプレビュー部分 */}
      <div className="p-5 pb-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-sm font-medium text-gray-800">30日間の回復プラン</p>
        </div>
      </div>

      {/* blur処理されたコンテンツ */}
      <div className="relative px-5 pb-5">
        <div className="select-none" style={{ filter: 'blur(5px)' }}>
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
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/0 via-white/80 to-white">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center max-w-xs">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-sm font-bold text-gray-800 mb-1">パーソナライズされた回復プラン</p>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              詳細な構造分析・30日間の具体的アクション・タイプ別おすすめリソースが含まれます
            </p>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 space-y-1 text-left">
                {[
                  { icon: FileText, text: '3,000字の詳細レポート' },
                  { icon: Calendar, text: '30日間の週次プラン' },
                  { icon: BookOpen, text: 'おすすめ書籍・ツール' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-gray-500">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handlePurchase}
              disabled={loading || !checkResultId}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-full transition-colors shadow-lg shadow-emerald-200/50 disabled:opacity-50"
            >
              {loading ? '処理中...' : '回復レポートを受け取る（¥1,480）'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
