// タイプ別・セクション別のSVGイラストカード
// 各サブ見出しの直後に挿入して視覚的にテキストを区切る

import type { BurnoutType } from '@/lib/scoring'

// 電池メタファー（消耗度を視覚化）
function BatteryIllustration({ level, label }: { level: number; label: string }) {
  const fillHeight = Math.max(8, (level / 100) * 48)
  const color = level >= 70 ? '#ef4444' : level >= 40 ? '#f59e0b' : '#22c55e'
  return (
    <div className="flex flex-col items-center">
      <svg width="40" height="64" viewBox="0 0 40 64">
        <rect x="12" y="0" width="16" height="4" rx="2" fill="#d1d5db" />
        <rect x="4" y="4" width="32" height="56" rx="6" fill="none" stroke="#e5e7eb" strokeWidth="2" />
        <rect x="8" y={60 - fillHeight} width="24" height={fillHeight - 4} rx="3" fill={color} opacity="0.7" />
      </svg>
      <p className="text-[10px] text-gray-400 mt-1">{label}</p>
    </div>
  )
}

// シールド（守り/信念の図）
function ShieldIllustration({ text }: { text: string }) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-5 flex items-center gap-4">
      <svg width="48" height="56" viewBox="0 0 48 56" className="flex-shrink-0">
        <path d="M24 2 L44 12 L44 28 C44 42 24 54 24 54 C24 54 4 42 4 28 L4 12 Z" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.6" />
        <path d="M24 8 L40 16 L40 28 C40 39 24 49 24 49 C24 49 8 39 8 28 L8 16 Z" fill="#6366f1" opacity="0.08" />
        <text x="24" y="32" textAnchor="middle" fontSize="16" fill="#6366f1">🛡</text>
      </svg>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  )
}

// 脳のループ図（思考パターン）
function LoopIllustration({ text }: { text: string }) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 flex items-center gap-4">
      <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0">
        <circle cx="24" cy="24" r="18" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
        <path d="M24 6 A18 18 0 1 1 6 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="8,18 2,24 8,24" fill="#f59e0b" />
        <text x="24" y="28" textAnchor="middle" fontSize="16">🔄</text>
      </svg>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  )
}

// 回復の芽（希望）
function SproutIllustration({ text }: { text: string }) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-5 flex items-center gap-4">
      <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0">
        <rect x="22" y="30" width="4" height="14" rx="2" fill="#86efac" />
        <ellipse cx="18" cy="28" rx="10" ry="8" fill="#86efac" opacity="0.5" transform="rotate(-20 18 28)" />
        <ellipse cx="30" cy="26" rx="10" ry="8" fill="#86efac" opacity="0.5" transform="rotate(20 30 26)" />
        <circle cx="24" cy="18" r="4" fill="#22c55e" opacity="0.3" />
        <text x="24" y="22" textAnchor="middle" fontSize="12">🌱</text>
      </svg>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  )
}

// 天秤（バランス）
function ScaleIllustration({ text }: { text: string }) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-5 flex items-center gap-4">
      <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0">
        <line x1="24" y1="8" x2="24" y2="40" stroke="#8b5cf6" strokeWidth="2" opacity="0.4" />
        <line x1="8" y1="20" x2="40" y2="16" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
        <circle cx="8" cy="20" r="6" fill="#8b5cf6" opacity="0.15" />
        <circle cx="40" cy="16" r="6" fill="#8b5cf6" opacity="0.15" />
        <text x="8" y="23" textAnchor="middle" fontSize="8" fill="#8b5cf6">重</text>
        <text x="40" y="19" textAnchor="middle" fontSize="8" fill="#8b5cf6">軽</text>
      </svg>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  )
}

// タイプ別のイラスト定義（サブ見出し順に3つ）
const ILLUSTRATIONS: Record<string, { component: React.FC<{ text: string }>; text: string }[]> = {
  devotee: [
    { component: LoopIllustration, text: '「自分がやらなきゃ」→ 感謝される → もっと頑張る → 止まれない。このループが回り続けている' },
    { component: ShieldIllustration, text: '「人の役に立つ＝自分の価値」という信念が、休むことを許さなくしている' },
    { component: SproutIllustration, text: '止まることは弱さではなく、長く走るための準備です' },
  ],
  perfectionist: [
    { component: ScaleIllustration, text: '80点でも十分なのに、100点以外は「失敗」に見えてしまう' },
    { component: LoopIllustration, text: '達成 → もっと上の基準 → 不足感 → さらに追い込む。終わりのない階段を登っている' },
    { component: SproutIllustration, text: '「十分だ」と言える瞬間を、少しずつ増やしていく' },
  ],
  empath: [
    { component: ShieldIllustration, text: '他者の感情を受け取りすぎて、自分の境界線が見えなくなっている' },
    { component: LoopIllustration, text: '我慢する → 溜め込む → 限界 → でもまた我慢する。この繰り返しが身体を消耗させている' },
    { component: SproutIllustration, text: '自分の感情に名前をつけることが、回復の第一歩です' },
  ],
  executor: [
    { component: ScaleIllustration, text: '努力と報酬のバランスが崩れている。出しているエネルギーに見合うものが返ってきていない' },
    { component: ShieldIllustration, text: '「自分でやった方が早い」が、実は一番遅い道になっている' },
    { component: SproutIllustration, text: '助けを求めることは、チームで成果を出すためのスキルです' },
  ],
  harmonizer: [
    { component: LoopIllustration, text: '空気を読む → 自分を合わせる → 本音を飲み込む → また読む。自動応答のように繰り返している' },
    { component: ShieldIllustration, text: '「いい人」であり続けるために、自分の感情がどこにあるかわからなくなっている' },
    { component: SproutIllustration, text: '自分の気持ちに気づくことが、本当の調和の始まりです' },
  ],
  seeker: [
    { component: ScaleIllustration, text: '脳が求める「刺激」と、今の環境が提供する「刺激」にギャップがある' },
    { component: LoopIllustration, text: '退屈 → 焦り → でも動けない → さらに退屈。やる気のスイッチが入らない状態が続いている' },
    { component: SproutIllustration, text: '小さな「初めて」が脳を再起動させます。大きな変化は必要ありません' },
  ],
}

// サブ見出しインデックスに応じたイラストを返す
export function getSectionIllustration(type: BurnoutType, sectionIndex: number): React.ReactNode | null {
  const typeIllustrations = ILLUSTRATIONS[type] ?? ILLUSTRATIONS.devotee
  const entry = typeIllustrations[sectionIndex]
  if (!entry) return null
  const Comp = entry.component
  return <Comp text={entry.text} />
}

// 電池3本の消耗度表示
export function BatterySet({ personal, work, interpersonal }: { personal: number; work: number; interpersonal: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <p className="text-[10px] text-gray-400 tracking-wider mb-4 text-center">あなたの電池残量</p>
      <div className="flex justify-center gap-8">
        <BatteryIllustration level={personal} label="個人" />
        <BatteryIllustration level={work} label="仕事" />
        <BatteryIllustration level={interpersonal} label="対人" />
      </div>
    </div>
  )
}
