import type { BurnoutType } from '@/lib/scoring'
import { Brain, Heart, Moon, Battery, Zap, CloudOff } from 'lucide-react'

interface MechanismStep {
  icon: React.ElementType
  organ: string
  metaphor: string
  detail: string
  color: string
}

const MECHANISMS: Record<BurnoutType, { title: string; steps: MechanismStep[] }> = {
  frenetic: {
    title: '熱狂型の身体で起きていること',
    steps: [
      {
        icon: Brain,
        organ: '脳',
        metaphor: '常にアラームが鳴りっぱなし',
        detail: 'ストレスホルモン（コルチゾール）が出続けて、脳が「危険だ！」と警報を止められない状態です。',
        color: '#f97316',
      },
      {
        icon: Zap,
        organ: '自律神経',
        metaphor: 'アクセル踏みっぱなしの車',
        detail: '身体を動かす「アクセル（交感神経）」がずっとオン。ブレーキ（副交感神経）が効かないので、リラックスできません。',
        color: '#ef4444',
      },
      {
        icon: Moon,
        organ: '睡眠',
        metaphor: '充電しても満タンにならない',
        detail: '深い睡眠が減り、寝ても回復が追いつきません。スマホの充電が80%止まりになるような感覚です。',
        color: '#dc2626',
      },
    ],
  },
  underchallenged: {
    title: '退屈型の身体で起きていること',
    steps: [
      {
        icon: Brain,
        organ: '脳の報酬系',
        metaphor: '「やった！」の感覚が薄くなる',
        detail: '達成感を感じるための仕組み（ドーパミン報酬系）の反応が鈍くなっています。何かをやり遂げても「嬉しい」が感じにくい状態です。',
        color: '#6b7280',
      },
      {
        icon: Battery,
        organ: 'やる気',
        metaphor: 'エンジンはあるのにガソリンがない',
        detail: '能力はあるのに、それを動かす燃料（動機づけ）が枯渇しています。「やれるのにやる気が出ない」のはこのためです。',
        color: '#3b82f6',
      },
      {
        icon: Heart,
        organ: '感情',
        metaphor: '心のアンテナが折れている',
        detail: '感情の振れ幅が小さくなり、喜びも悲しみも感じにくくなっています。「何も感じない」こと自体がストレスサインです。',
        color: '#2563eb',
      },
    ],
  },
  wornout: {
    title: '消耗型の身体で起きていること',
    steps: [
      {
        icon: Brain,
        organ: 'ストレス応答',
        metaphor: '防御システムが電池切れ',
        detail: '長期間のストレスで、身体の防御反応（HPA軸）が疲弊しています。ストレスに対して「もう反応できない」状態です。',
        color: '#1e3a5f',
      },
      {
        icon: CloudOff,
        organ: '回復力',
        metaphor: '穴の空いたバケツ',
        detail: 'エネルギーを貯める力自体が弱まっています。休んでも回復しない感覚は、バケツに穴が空いているようなものです。',
        color: '#7c3aed',
      },
      {
        icon: Heart,
        organ: '心',
        metaphor: '「どうせ無駄」が身体に染みついている',
        detail: '努力しても報われない経験が重なり、身体が「頑張っても意味がない」と学習してしまった状態です。これは性格ではなく、身体の反応です。',
        color: '#6d28d9',
      },
    ],
  },
  balanced: {
    title: 'あなたの身体の状態',
    steps: [
      {
        icon: Brain,
        organ: '脳',
        metaphor: 'バランスが保たれている',
        detail: '特定のストレスパターンに偏っていない状態です。ただし、総合スコアが高い場合は複合的な疲労が蓄積している可能性があります。',
        color: '#059669',
      },
      {
        icon: Heart,
        organ: '心身',
        metaphor: '定期的なセルフチェックが大切',
        detail: '今のバランスを維持するために、睡眠・運動・人とのつながりの3つを意識してみてください。',
        color: '#10b981',
      },
      {
        icon: Battery,
        organ: '回復力',
        metaphor: '充電できる状態',
        detail: '回復のためのリソースがまだ残っています。この状態のうちに、自分をケアする習慣を作っておくことが予防になります。',
        color: '#34d399',
      },
    ],
  },
}

export default function BodyMechanism({ type }: { type: BurnoutType }) {
  const data = MECHANISMS[type]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="p-5 border-b border-gray-50">
        <p className="text-xs text-gray-400 tracking-wider mb-1">WHAT&apos;S HAPPENING IN YOUR BODY</p>
        <h3 className="text-base font-bold text-gray-800">{data.title}</h3>
      </div>
      <div className="p-5">
        <div className="relative">
          {data.steps.map((step, i) => {
            const Icon = step.icon
            const isLast = i === data.steps.length - 1
            return (
              <div key={i} className="flex gap-4 mb-0">
                {/* 縦線 + アイコン */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${step.color}10` }}>
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  {!isLast && (
                    <div className="w-0.5 flex-1 my-1 rounded-full" style={{ backgroundColor: `${step.color}20` }} />
                  )}
                </div>
                {/* テキスト */}
                <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-6'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-800">{step.organ}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${step.color}10`, color: step.color }}>
                      {step.metaphor}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-5 pt-4 border-t border-gray-50">
          <p className="text-[10px] text-gray-400 leading-relaxed">
            ※これは性格の問題ではなく、身体のストレス反応です。適切なケアによって改善が期待できます。
          </p>
        </div>
      </div>
    </div>
  )
}
