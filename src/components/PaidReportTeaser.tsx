import type { BurnoutType } from '@/lib/scoring'
import { Lock, FileText, Calendar, BookOpen } from 'lucide-react'

const TEASER_CONTENT: Record<BurnoutType, { weeklyPlan: string[]; insight: string }> = {
  frenetic: {
    weeklyPlan: [
      '第1週：1日1つ「やらないこと」を決める練習',
      '第2週：睡眠の質を上げる3つの具体ステップ',
      '第3週：「止まっても大丈夫」の思考回路を作る',
      '第4週：新しいペースの定着と振り返り',
    ],
    insight: '熱狂型の回復で最も重要なのは「止まる仕組み」を作ることです。意志の力では止まれません。環境を設計し...',
  },
  underchallenged: {
    weeklyPlan: [
      '第1週：1日1つ「小さな新しいこと」を試す',
      '第2週：自分の価値観を再発見するワーク',
      '第3週：「熟達体験」を意図的に作る方法',
      '第4週：新しい刺激の習慣化と振り返り',
    ],
    insight: '退屈型の回復の鍵は「小さな成功体験」の積み重ねです。大きな変化は必要ありません。毎日の中に...',
  },
  wornout: {
    weeklyPlan: [
      '第1週：1日1つ「できたこと」を書き出す',
      '第2週：エネルギーを「貯める」習慣を作る',
      '第3週：小さなコントロール感覚を取り戻す',
      '第4週：自分のペースでの回復を定着させる',
    ],
    insight: '消耗型の回復は焦らないことが最も大切です。「頑張る」ことではなく「認める」ことから始めます...',
  },
  balanced: {
    weeklyPlan: [
      '第1週：現在のストレス源を棚卸しする',
      '第2週：予防的セルフケアの習慣を設計する',
      '第3週：心身のバランスを可視化する方法',
      '第4週：定期チェックの習慣化',
    ],
    insight: 'バランス型は現在のコンディションを維持することが重要です。予防的なアプローチとして...',
  },
}

export default function PaidReportTeaser({ type }: { type: BurnoutType }) {
  const content = TEASER_CONTENT[type]

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
            <div className="inline-block px-6 py-3 bg-gray-200 text-gray-500 text-sm font-medium rounded-full">
              準備中（近日公開）
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
