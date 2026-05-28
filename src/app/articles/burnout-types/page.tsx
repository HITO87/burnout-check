import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '燃え尽き症候群の3タイプ — 熱狂型・退屈型・消耗型の特徴と対処法 | HITONE',
  description: 'バーンアウトには3つのタイプがあります。熱狂型（止まれない）、退屈型（刺激がない）、消耗型（もう無理）。あなたはどのタイプ？科学的分類に基づく解説。',
}

export default function BurnoutTypesPage() {
  const types = [
    {
      name: '熱狂型（Frenetic）',
      color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200',
      catchphrase: '止まれない。休めない。でも「もっとやらなきゃ」。',
      traits: ['キャパを超えて引き受ける', '休憩に罪悪感', '成果への強い執着', '私生活が犠牲になっている'],
      mechanism: 'コルチゾールが過剰分泌。交感神経が常にオン。身体が「戦闘モード」から抜けられない。',
      recovery: '「止まる仕組み」を環境に組み込む。意志力では止まれない。カレンダーに「何もしない時間」をブロックする。就寝90分前のシャットダウンルーティン。',
    },
    {
      name: '退屈型（Underchallenged）',
      color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200',
      catchphrase: '刺激がない。成長がない。何のためにやっているのか。',
      traits: ['仕事に変化がない', '能力が活かされていない', '成長実感がない', '退屈さや無関心'],
      mechanism: 'ドーパミン報酬系の反応が鈍化。達成感を感じるセンサーが鈍くなっている。',
      recovery: '毎日1つ「小さな新しいこと」を取り入れる。仕事の外で「熟達体験」を作る。料理、楽器、語学など上達を実感できるもの。',
    },
    {
      name: '消耗型（Worn-out）',
      color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200',
      catchphrase: '何をしても報われない。努力する気力すら残っていない。',
      traits: ['努力に見合う評価がない', '困難で努力を放棄', 'コントロール感の喪失', '学習性無力感'],
      mechanism: 'HPA軸の反応性が低下。コルチゾールの分泌能力が枯渇。ストレスに対して「もう反応できない」状態。',
      recovery: 'まず「できたことを認める」練習から。毎晩3つ書き出す。1日1回「自分で選ぶ」小さな決断を意識する。',
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <article className="max-w-2xl mx-auto px-4 pt-12 pb-20">
        <Link href="/" className="text-xs text-gray-400 hover:text-emerald-600 mb-6 block">← トップに戻る</Link>

        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">燃え尽き症候群の3タイプ<br />あなたはどれに当てはまる？</h1>
        <p className="text-xs text-gray-400 mb-4">最終更新: 2026年5月</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">Montero-Marín & García-Campayo（2010）の研究に基づく、バーンアウトの3つの臨床サブタイプを解説します。同じ「燃え尽き」でも、タイプによって原因も回復方法もまったく違います。</p>

        <div className="space-y-6">
          {types.map(t => (
            <div key={t.name} className={`${t.bg} rounded-2xl p-6 border ${t.border}`}>
              <h2 className={`text-lg font-bold ${t.color} mb-2`}>{t.name}</h2>
              <p className="text-sm text-gray-700 italic mb-4">「{t.catchphrase}」</p>

              <h3 className="text-xs font-medium text-gray-500 tracking-wider mb-2">特徴</h3>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                {t.traits.map(tr => <li key={tr} className="flex items-start gap-2"><span className="text-gray-400 mt-1">-</span> {tr}</li>)}
              </ul>

              <h3 className="text-xs font-medium text-gray-500 tracking-wider mb-2">身体で起きていること</h3>
              <p className="text-sm text-gray-700 mb-4">{t.mechanism}</p>

              <h3 className="text-xs font-medium text-gray-500 tracking-wider mb-2">回復のヒント</h3>
              <p className="text-sm text-gray-700">{t.recovery}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-white rounded-2xl border border-gray-100">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong>参考文献:</strong> Montero-Marín, J., García-Campayo, J., Mera, D. M., & López del Hoyo, Y. (2009). A new definition of burnout syndrome based on Farber&#39;s proposal. Journal of Occupational Medicine and Toxicology, 4, 31.
          </p>
        </div>

        <div className="mt-12 bg-emerald-50 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-emerald-800 mb-2">あなたはどのタイプ？</p>
          <p className="text-xs text-emerald-600 mb-4">31問・約8分で科学的に分析します。</p>
          <Link href="/check" className="group inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-full transition-colors">
            無料でチェックする <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </article>
    </div>
  )
}
