// レポート用の視覚コンポーネント集
import type { BurnoutType } from '@/lib/scoring'

// ストレスゲージ（半円メーター）
export function StressGauge({ score, label }: { score: number; label: string }) {
  const angle = (score / 100) * 180
  const color = score >= 75 ? '#ef4444' : score >= 50 ? '#f97316' : score >= 25 ? '#eab308' : '#22c55e'
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-16 overflow-hidden">
        <svg viewBox="0 0 100 50" className="w-full">
          <path d="M5 50 A 45 45 0 0 1 95 50" fill="none" stroke="#f3f4f6" strokeWidth="8" strokeLinecap="round" />
          <path d="M5 50 A 45 45 0 0 1 95 50" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${(angle / 180) * 141.37} 141.37`} />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-0">
          <span className="text-xl font-bold text-gray-800">{score}</span>
        </div>
      </div>
      <p className="text-[10px] text-gray-500 mt-1">{label}</p>
    </div>
  )
}

// 3つのスコア比較バー
export function ScoreCompare({ scores }: { scores: { label: string; score: number; color: string }[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <p className="text-[10px] text-gray-400 tracking-wider mb-4">あなたの疲れの重心</p>
      <div className="space-y-4">
        {scores.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-gray-700">{s.label}</span>
              <span className="text-sm font-bold" style={{ color: s.color }}>{s.score}</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${s.score}%`, backgroundColor: s.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// タイプカード（大きな視覚要素）
export function TypeCard({ typeName, hiddenStrength, pattern, gradientFrom, gradientTo }: {
  typeName: string; hiddenStrength: string; pattern: string; gradientFrom: string; gradientTo: string
}) {
  return (
    <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}>
      <p className="text-[10px] tracking-wider opacity-70 mb-2">あなたのタイプ</p>
      <h3 className="text-xl font-bold mb-3">{typeName}</h3>
      <div className="flex gap-3">
        <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl p-3">
          <p className="text-[9px] opacity-70 mb-1">隠れた強み</p>
          <p className="text-sm font-medium">{hiddenStrength}</p>
        </div>
        <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl p-3">
          <p className="text-[9px] opacity-70 mb-1">疲れ方の特徴</p>
          <p className="text-sm font-medium">{pattern}</p>
        </div>
      </div>
    </div>
  )
}

// 信念の連鎖図（成功体験→信念→行動→消耗）
export function BeliefChain({ steps }: { steps: string[] }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <p className="text-[10px] text-gray-400 tracking-wider mb-4">あなたの消耗が生まれる構造</p>
      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={i}>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-500">{i + 1}</div>
              <p className="text-sm text-gray-700 leading-relaxed pt-1">{step}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-start ml-3.5">
                <svg className="w-3 h-4 text-gray-300 my-1" fill="none" viewBox="0 0 12 16" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 0v12M2 8l4 4 4-4" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// 身体のストレス表示（簡易版）
export function BodyStress({ type }: { type: BurnoutType }) {
  const typeData: Record<string, { brain: string; heart: string; body: string }> = {
    devotee: { brain: '「止まったら価値がない」という警報が鳴り続けている', heart: 'ストレスホルモンが高止まりし、常に臨戦態勢', body: '深い睡眠が取れず、朝から疲れている' },
    perfectionist: { brain: '「まだ終わってない」という信号が消えない', heart: '交感神経が優位のまま、リラックスできない', body: '肩・首の慢性的な緊張、頭痛' },
    empath: { brain: '他者の感情を処理し続けて、容量オーバー', heart: 'ストレス応答系が疲弊し、エネルギーが枯渇', body: '朝起きた瞬間から疲れている、感情が鈍くなる' },
    executor: { brain: '「頑張っても無駄」という学習が進んでいる', heart: '報酬系が鈍化し、達成感を感じにくい', body: '慢性的なだるさ、やる気の消失' },
    harmonizer: { brain: '常に周囲を監視し、完全にオフにならない', heart: '微弱なストレスが途切れず、自律神経が緊張', body: '常に「なんとなく疲れている」状態' },
    seeker: { brain: '刺激不足でやる気のスイッチが入らない', heart: 'ストレスホルモンが低空飛行、活力がない', body: '何をしても手応えがない、退屈で消耗する' },
  }
  const data = typeData[type] ?? typeData.devotee

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <p className="text-[10px] text-gray-400 tracking-wider mb-4">あなたの身体で起きていること</p>
      <div className="space-y-3">
        {[
          { icon: '🧠', label: '脳', desc: data.brain },
          { icon: '❤️', label: '自律神経', desc: data.heart },
          { icon: '🫁', label: '身体', desc: data.body },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <div>
              <p className="text-xs font-bold text-gray-800 mb-0.5">{item.label}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// やること vs やらなくていいこと 対比カード
export function DoAndDont({ doItems, dontItems }: { doItems: string[]; dontItems: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
        <p className="text-xs font-bold text-emerald-800 mb-3 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span>
          やること
        </p>
        <div className="space-y-2">
          {doItems.map((item, i) => (
            <p key={i} className="text-xs text-emerald-700 leading-relaxed">{item}</p>
          ))}
        </div>
      </div>
      <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
        <p className="text-xs font-bold text-red-800 mb-3 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-red-400 text-white flex items-center justify-center text-[10px]">✕</span>
          やらなくていいこと
        </p>
        <div className="space-y-2">
          {dontItems.map((item, i) => (
            <p key={i} className="text-xs text-red-700 leading-relaxed">{item}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

// インサイトカード（テキストの間に挟む視覚的ブレイク）
export function InsightCard({ emoji, text, bgColor = 'bg-blue-50' }: { emoji: string; text: string; bgColor?: string }) {
  return (
    <div className={`${bgColor} rounded-2xl p-5 my-5 flex items-start gap-3`}>
      <span className="text-2xl flex-shrink-0">{emoji}</span>
      <p className="text-sm text-gray-700 leading-relaxed font-medium">{text}</p>
    </div>
  )
}

// タイプ別のインサイトイラスト集（サブ見出し間に挿入用）
export const TYPE_INSIGHTS: Record<string, { emoji: string; text: string; bgColor: string }[]> = {
  devotee: [
    { emoji: '🏃‍♂️', text: '「自分がやらなきゃ」で走り続けた結果、ブレーキの踏み方を忘れてしまった状態です', bgColor: 'bg-orange-50' },
    { emoji: '🔋', text: '電池が切れかけているのに、まだ充電より先に「あと少し」を選んでしまう', bgColor: 'bg-amber-50' },
    { emoji: '🌿', text: '休むことは怠けではなく、長く走るための「充電」です', bgColor: 'bg-emerald-50' },
  ],
  perfectionist: [
    { emoji: '🎯', text: '80点で十分なのに、100点じゃないと手を止められない。その基準が自分を追い詰めている', bgColor: 'bg-blue-50' },
    { emoji: '⚖️', text: '「まだ足りない」の声は、あなたの品質意識の裏返し。強みが武器から重荷に変わっている', bgColor: 'bg-indigo-50' },
    { emoji: '🌿', text: '完璧じゃなくても価値がある。それを身体で理解することが回復の鍵です', bgColor: 'bg-emerald-50' },
  ],
  empath: [
    { emoji: '🫧', text: '人の感情を受け取りすぎて、自分の感情がどこにあるかわからなくなっている', bgColor: 'bg-teal-50' },
    { emoji: '🧊', text: '「自分さえ我慢すれば」は、優しさの裏返し。でもその優しさが自分を溶かしている', bgColor: 'bg-cyan-50' },
    { emoji: '🌿', text: '感情を出すことは弱さではなく、回復の第一歩です', bgColor: 'bg-emerald-50' },
  ],
  executor: [
    { emoji: '🏋️', text: '一人で全部背負い続けた結果、「助けを求める」という選択肢が見えなくなっている', bgColor: 'bg-gray-100' },
    { emoji: '📉', text: '頑張っても報われない経験が積み重なり、「どうせ」が口癖になりかけている', bgColor: 'bg-slate-50' },
    { emoji: '🌿', text: '助けを求めることは弱さではなく、チームで成果を出すためのスキルです', bgColor: 'bg-emerald-50' },
  ],
  harmonizer: [
    { emoji: '🎭', text: '場の空気を読みすぎて、「自分がどう感じているか」がわからなくなっている', bgColor: 'bg-purple-50' },
    { emoji: '🪞', text: '「いい人」でいることに疲れた。でも「いい人じゃない自分」が怖い', bgColor: 'bg-violet-50' },
    { emoji: '🌿', text: '自分の気持ちに気づくことが、本当の調和の始まりです', bgColor: 'bg-emerald-50' },
  ],
  seeker: [
    { emoji: '🧭', text: '「このままでいいのか」という焦りは、脳が新しい刺激を求めているサイン', bgColor: 'bg-emerald-50' },
    { emoji: '💤', text: '何もしたくないのは怠けではなく、脳の報酬系が省エネモードに入っている状態', bgColor: 'bg-green-50' },
    { emoji: '🌿', text: '小さな「初めて」が脳を再起動させます。大きな変化は必要ありません', bgColor: 'bg-emerald-50' },
  ],
}

// 読了進捗バー（スティッキー）
export function ReadingProgress() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100">
      <div
        className="h-full bg-emerald-500 transition-all duration-150"
        id="reading-progress-bar"
        style={{ width: '0%' }}
      />
    </div>
  )
}

// 読了進捗バーのスクリプト（Client Component用）
export function ReadingProgressScript() {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
      (function() {
        var bar = document.getElementById('reading-progress-bar');
        if (!bar) return;
        window.addEventListener('scroll', function() {
          var h = document.documentElement;
          var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
          bar.style.width = Math.min(pct, 100) + '%';
        });
      })();
    `}} />
  )
}
