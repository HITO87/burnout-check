import Link from 'next/link'
import { TYPE_INFO } from '@/lib/type-descriptions'

export default function LandingPage() {
  const types = ['frenetic', 'underchallenged', 'wornout'] as const

  return (
    <div className="min-h-screen bg-white">
      {/* ヒーロー */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-xs text-emerald-600 font-medium tracking-wider mb-4">HITONE BURNOUT CHECK</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
            あなたの燃え尽き、<br />科学で読み解く。
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            8分のセルフチェックで、あなたの燃え尽きタイプと<br className="hidden sm:block" />回復の道筋がわかります。
          </p>
          <Link
            href="/check"
            className="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-lg shadow-emerald-100 transition-all hover:shadow-xl"
          >
            無料でチェックする（約8分）
          </Link>
          <p className="text-[10px] text-gray-400 mt-4">※医学的診断ではありません</p>
        </div>
      </section>

      {/* 共感セクション */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg font-bold text-gray-800 text-center mb-8">こんなことありませんか？</h2>
          <div className="space-y-3">
            {[
              '朝起きた瞬間から疲れている',
              '頑張りたいのにエネルギーが出ない',
              '成果を出しても達成感がない',
              '休んでも回復した感じがしない',
            ].map(text => (
              <div key={text} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <span className="text-amber-400">●</span>
                <p className="text-sm text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* わかること */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg font-bold text-gray-800 text-center mb-8">このチェックでわかること</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: '📊', text: '燃え尽き度スコア（0〜100）' },
              { emoji: '🔍', text: '3タイプのどれに該当するか' },
              { emoji: '🧠', text: 'あなたの身体で何が起きているか' },
              { emoji: '🗺️', text: 'タイプ別の回復ヒント' },
            ].map(item => (
              <div key={item.text} className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-2xl mb-2">{item.emoji}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3タイプ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg font-bold text-gray-800 text-center mb-8">3つの燃え尽きタイプ</h2>
          <div className="space-y-4">
            {types.map(key => {
              const t = TYPE_INFO[key]
              return (
                <div key={key} className={`${t.bgColor} rounded-2xl p-5`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{t.emoji}</span>
                    <h3 className={`text-base font-bold ${t.color}`}>{t.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.summary}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 信頼性 */}
      <section className="py-12 px-4">
        <div className="max-w-lg mx-auto bg-emerald-50 rounded-2xl p-5">
          <p className="text-xs text-emerald-700 leading-relaxed">
            本チェックは、Copenhagen Burnout Inventory（Kristensen et al., 2005）および
            Burnout Clinical Subtypes Questionnaire（Montero-Marín &amp; García-Campayo, 2010）
            に基づいて設計されています。
          </p>
        </div>
      </section>

      {/* CTA（再度） */}
      <section className="py-16 px-4 text-center">
        <Link
          href="/check"
          className="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-lg shadow-emerald-100 transition-all hover:shadow-xl"
        >
          無料でチェックする（約8分）
        </Link>
      </section>

      {/* フッター */}
      <footer className="py-8 px-4 border-t border-gray-100">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-[10px] text-gray-400 leading-relaxed mb-4">
            ※本サービスは医学的診断ではなく、セルフチェックの目安として提供しています。
            結果は個人の主観的回答に基づいており、医師の診断に代わるものではありません。
            つらい状況が続いている場合は、心療内科等の専門医療機関へご相談ください。
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600">プライバシーポリシー</Link>
            <Link href="/legal" className="hover:text-gray-600">特定商取引法に基づく表記</Link>
          </div>
          <p className="text-xs text-gray-300 mt-4">HITONE</p>
        </div>
      </footer>
    </div>
  )
}
