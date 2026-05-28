import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '燃え尽き症候群からの回復方法 — 科学的根拠に基づく5つのステップ | HITONE',
  description: 'バーンアウトからの回復は可能です。ストレスサイクルの完了、睡眠の最適化、自律神経の調整など、科学的根拠に基づく5つの回復ステップを解説。',
}

export default function BurnoutRecoveryPage() {
  const steps = [
    {
      num: 1,
      title: 'ストレスサイクルを完了させる',
      source: 'Emily Nagoski「Burnout」',
      content: 'ストレスの「原因」を解決しても、身体の中のストレス反応は終わっていません。これが「問題は解決したのに疲れが取れない」原因です。ストレスサイクルを身体で完了させる必要があります。',
      actions: ['20分以上の有酸素運動（ウォーキングでOK）', '6秒の深呼吸（吸う4秒→吐く6秒）を5回', '20秒のハグ（信頼できる人と）', '思いっきり笑う or 泣く'],
    },
    {
      num: 2,
      title: 'コルチゾールのリズムを整える',
      source: 'Andrew Huberman, PhD',
      content: 'コルチゾール（ストレスホルモン）は「朝高く→夜低い」のが正常です。このリズムが崩れると、朝起きられない・夜眠れないという悪循環に入ります。',
      actions: ['起床後30分以内に太陽光を10分浴びる', '起床後90分間はカフェインを避ける', '就寝2時間前にスマホ・PCを止める', '毎日同じ時間に起きる（±30分以内）'],
    },
    {
      num: 3,
      title: '自律神経を「安全モード」に戻す',
      source: 'Deb Dana, Polyvagal Theory',
      content: 'バーンアウト状態では、自律神経が「戦闘モード」（交感神経優位）または「凍結モード」（背側迷走神経優位）にロックされています。「安全モード」に戻すには、身体に「安全だよ」と伝えるシグナルが必要です。',
      actions: ['「生理的溜息」（二重吸気+長い吐き出し）を3回', '冷水で顔を洗う（潜水反射で副交感神経活性化）', '対面での穏やかな会話（5分でも効果あり）', 'ハミングやボイストレーニング（迷走神経を刺激）'],
    },
    {
      num: 4,
      title: '「小さな成功体験」を積み重ねる',
      source: 'Albert Bandura, Self-Efficacy Theory',
      content: 'バーンアウトで失われるのは「自分にはできる」という感覚（自己効力感）です。これを取り戻すには、大きな目標ではなく、確実にできる小さなことから始めます。',
      actions: ['毎晩「今日できたこと」を3つ書き出す', '1日1つ「自分で決めた」ことを意識する', 'BJ Fogg式：既存の習慣に2分の行動をくっつける', '完了したタスクを可視化する（チェックリスト、カレンダー）'],
    },
    {
      num: 5,
      title: '定期的にセルフチェックする',
      source: 'Kristensen et al., 2005',
      content: 'バーンアウトは徐々に進行するため、自分では気づきにくい特徴があります。月に1回のセルフチェックで、変化を早期に検知し、悪化する前に対処できます。',
      actions: ['月1回のバーンアウト・セルフチェック', '前回スコアとの比較で変化を確認', 'スコアが上昇傾向なら早めに生活を見直す', '高スコアが続く場合は専門家に相談'],
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <article className="max-w-2xl mx-auto px-4 pt-12 pb-20">
        <Link href="/" className="text-xs text-gray-400 hover:text-emerald-600 mb-6 block">← トップに戻る</Link>

        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">燃え尽き症候群からの回復<br />科学的根拠に基づく5つのステップ</h1>
        <p className="text-xs text-gray-400 mb-4">最終更新: 2026年5月</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">バーンアウトからの回復は可能です。ただし「頑張って乗り越える」ではなく、身体のストレス応答システムを正常に戻す科学的なアプローチが必要です。ここでは、研究に基づく5つの回復ステップを紹介します。</p>

        <div className="space-y-6">
          {steps.map(s => (
            <div key={s.num} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700">{s.num}</div>
                <h2 className="text-base font-bold text-gray-800">{s.title}</h2>
              </div>
              <p className="text-[10px] text-gray-400 mb-3">出典: {s.source}</p>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{s.content}</p>
              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-xs font-medium text-emerald-700 mb-2">具体的なアクション</p>
                <ul className="text-xs text-emerald-800 space-y-1.5">
                  {s.actions.map(a => <li key={a} className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">-</span> {a}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-red-50 rounded-2xl border border-red-100">
          <p className="text-sm font-medium text-red-800 mb-2">つらい状況が続いている方へ</p>
          <p className="text-xs text-red-600 leading-relaxed">セルフケアだけでは改善しない場合、専門家の助けが有効です。心療内科やカウンセラーへの相談は「弱さ」ではなく「賢い選択」です。</p>
        </div>

        <div className="mt-12 bg-emerald-50 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-emerald-800 mb-2">まず、自分の状態を知ることから</p>
          <p className="text-xs text-emerald-600 mb-4">8分の無料セルフチェックで、あなたの燃え尽きタイプと回復の道筋がわかります。</p>
          <Link href="/check" className="group inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-full transition-colors">
            無料でチェックする <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </article>
    </div>
  )
}
