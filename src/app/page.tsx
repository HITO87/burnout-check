import Link from 'next/link'
import { TYPE_INFO } from '@/lib/type-descriptions'
import { BarChart3, Search, Brain, Map, ChevronRight, Shield } from 'lucide-react'

function WaveDivider({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 80" className={`w-full block ${flip ? 'rotate-180' : ''}`} preserveAspectRatio="none">
      <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f9fafb" />
    </svg>
  )
}

function WaveDividerReverse({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 80" className={`w-full block ${flip ? 'rotate-180' : ''}`} preserveAspectRatio="none">
      <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
    </svg>
  )
}

export default function LandingPage() {
  const types = ['devotee', 'perfectionist', 'empath', 'executor', 'harmonizer', 'seeker'] as const

  const features = [
    { icon: BarChart3, label: '燃え尽き度スコア', desc: '0〜100で数値化' },
    { icon: Search, label: 'タイプ判定', desc: '6タイプから特定' },
    { icon: Brain, label: '身体のメカニズム', desc: '何が起きているか図解' },
    { icon: Map, label: '回復のヒント', desc: 'タイプ別の対処法' },
  ]

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      {/* ヒーロー */}
      <section className="pt-24 pb-20 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-medium px-4 py-1.5 rounded-full mb-8 border border-emerald-100">
            <Shield className="w-3.5 h-3.5" />
            学術研究に基づいたセルフチェック
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5 tracking-tight">
            あなたの燃え尽き、<br />科学で読み解く。
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-10 max-w-sm mx-auto">
            8分のセルフチェックで、あなたの燃え尽きタイプと回復の道筋がわかります。
          </p>
          <Link
            href="/check"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-lg shadow-emerald-200/50 transition-all hover:shadow-xl hover:shadow-emerald-200/60"
          >
            無料でチェックする
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="text-[10px] text-gray-400 mt-4">約8分・31問・医学的診断ではありません</p>
        </div>
      </section>

      <WaveDivider />

      {/* 共感セクション */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-lg mx-auto">
          <p className="text-xs text-gray-400 tracking-widest text-center mb-3">SELF CHECK</p>
          <h2 className="text-lg font-bold text-gray-800 text-center mb-10">こんなことありませんか？</h2>
          <div className="space-y-3">
            {[
              '朝起きた瞬間から疲れている',
              '頑張りたいのにエネルギーが出ない',
              '成果を出しても達成感がない',
              '休んでも回復した感じがしない',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                <p className="text-sm text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDividerReverse />

      {/* わかること */}
      <section className="py-16 px-4 bg-[#FFFDF7]">
        <div className="max-w-lg mx-auto">
          <p className="text-xs text-gray-400 tracking-widest text-center mb-3">FEATURES</p>
          <h2 className="text-lg font-bold text-gray-800 text-center mb-10">このチェックでわかること</h2>
          <div className="grid grid-cols-2 gap-4">
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* 3タイプ */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-lg mx-auto">
          <p className="text-xs text-gray-400 tracking-widest text-center mb-3">6 TYPES</p>
          <h2 className="text-lg font-bold text-gray-800 text-center mb-10">6つの燃え尽きタイプ</h2>
          <div className="space-y-4">
            {types.map(key => {
              const t = TYPE_INFO[key]
              return (
                <div key={key} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold leading-tight text-center px-1" style={{ background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})` }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${t.color}`}>{t.name}</h3>
                      <p className="text-[10px] text-gray-400">{t.pattern}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.summary}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <WaveDividerReverse />

      {/* 信頼性 */}
      <section className="py-12 px-4 bg-[#FFFDF7]">
        <div className="max-w-lg mx-auto text-center">
          <Shield className="w-5 h-5 text-emerald-500 mx-auto mb-3" />
          <p className="text-sm text-gray-700 font-medium mb-1">科学的に検証された質問項目を使用しています</p>
          <p className="text-xs text-gray-400">※医学的診断ではありません。セルフチェックの目安としてご利用ください</p>
        </div>
      </section>

      {/* CTA（再度） */}
      <section className="py-20 px-4 bg-[#FFFDF7] text-center">
        <p className="text-sm text-gray-500 mb-6">まずは、自分の状態を知ることから。</p>
        <Link
          href="/check"
          className="group inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-lg shadow-emerald-200/50 transition-all hover:shadow-xl"
        >
          無料でチェックする
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </section>

      {/* フッター */}
      <footer className="py-8 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-[10px] text-gray-400 leading-relaxed mb-4">
            ※本サービスは医学的診断ではなく、セルフチェックの目安として提供しています。
            結果は個人の主観的回答に基づいており、医師の診断に代わるものではありません。
            つらい状況が続いている場合は、心療内科等の専門医療機関へご相談ください。
          </p>
          <p className="text-[10px] text-gray-400 leading-relaxed mb-4 max-w-sm mx-auto">
            本チェックは、Copenhagen Burnout Inventory（Kristensen et al., 2005）および
            Burnout Clinical Subtypes Questionnaire（Montero-Marín &amp; García-Campayo, 2010）
            に基づいて設計されています。
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">プライバシーポリシー</Link>
            <span className="text-gray-200">|</span>
            <Link href="/legal" className="hover:text-gray-600 transition-colors">特定商取引法に基づく表記</Link>
          </div>
          <p className="text-xs text-gray-300 mt-4 tracking-wider">HITONE</p>
        </div>
      </footer>
    </div>
  )
}
