import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'バーンアウト（燃え尽き症候群）とは？原因・症状・セルフチェック | HITONE',
  description: 'バーンアウト（燃え尽き症候群）の原因、症状、セルフチェック方法を科学的根拠に基づいて解説。WHOの定義、HPA軸のメカニズム、3つのタイプ分類まで。',
}

export default function WhatIsBurnoutPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <article className="max-w-2xl mx-auto px-4 pt-12 pb-20">
        <Link href="/" className="text-xs text-gray-400 hover:text-emerald-600 mb-6 block">← トップに戻る</Link>

        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">バーンアウト（燃え尽き症候群）とは？<br />原因・症状・科学的メカニズム</h1>
        <p className="text-xs text-gray-400 mb-8">最終更新: 2026年5月</p>

        <div className="prose-sm space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-800 mt-8 mb-3">バーンアウトの定義</h2>
            <p className="text-sm">バーンアウト（燃え尽き症候群）は、2019年にWHO（世界保健機関）が国際疾病分類（ICD-11）に「職業関連の現象」として公式に収録した概念です。</p>
            <p className="text-sm mt-3">WHOの定義では、バーンアウトは以下の3つの特徴で構成されています：</p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
              <li><strong>エネルギーの枯渇・消耗感</strong>（exhaustion）</li>
              <li><strong>仕事からの心理的距離の増大・否定的感情</strong>（cynicism）</li>
              <li><strong>職業的な効力感の低下</strong>（reduced efficacy）</li>
            </ul>
            <p className="text-sm mt-3">重要なのは、バーンアウトは「性格の弱さ」ではなく、長期的なストレスに対する身体の正常な反応だということです。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mt-8 mb-3">身体で何が起きているか（HPA軸）</h2>
            <p className="text-sm">バーンアウトの核心にあるのは、HPA軸（視床下部-下垂体-副腎系）と呼ばれるストレス応答システムの機能不全です。</p>
            <p className="text-sm mt-3">正常な状態では、ストレスを感じると脳の「司令官」（視床下部）がコルチゾール（ストレスホルモン）の放出を指示し、危険が去ると「もう大丈夫」と信号を送って停止します。</p>
            <p className="text-sm mt-3">しかし、慢性的なストレスが続くと、このフィードバックループが壊れます。コルチゾールが出続けるか（熱狂型）、あるいは出す力自体が枯渇するか（消耗型）。どちらもバーンアウトの身体的な正体です。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mt-8 mb-3">バーンアウトの主な症状</h2>
            <p className="text-sm">バーンアウトの症状は身体・精神・行動の3領域にわたります：</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-medium text-gray-800 mb-2">身体面</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>慢性的な疲労感</li><li>頭痛・筋肉痛</li><li>睡眠障害</li><li>免疫力低下</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-medium text-gray-800 mb-2">精神面</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>無力感・虚しさ</li><li>自己否定</li><li>集中力低下</li><li>感情の麻痺</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-medium text-gray-800 mb-2">行動面</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>仕事の先延ばし</li><li>社会的な引きこもり</li><li>食欲変化</li><li>アルコール増加</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mt-8 mb-3">3つのバーンアウトタイプ</h2>
            <p className="text-sm">Montero-Marín & García-Campayo（2010）の研究によると、バーンアウトには3つの臨床サブタイプがあります：</p>
            <ul className="list-disc pl-5 space-y-2 text-sm mt-3">
              <li><strong>熱狂型（Frenetic）</strong> — 過剰に働き続け、止まれない。成果への執着が強い。</li>
              <li><strong>退屈型（Underchallenged）</strong> — 刺激がなく、成長実感がない。無気力。</li>
              <li><strong>消耗型（Worn-out）</strong> — 努力が報われず、学習性無力感に陥っている。</li>
            </ul>
            <p className="text-sm mt-3">自分がどのタイプかを知ることで、適切な回復アプローチを選ぶことができます。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mt-8 mb-3">参考文献</h2>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>WHO (2019). ICD-11: Burn-out as an occupational phenomenon.</li>
              <li>Kristensen, T.S. et al. (2005). The Copenhagen Burnout Inventory. Work & Stress, 19(3), 192-207.</li>
              <li>Montero-Marín, J. & García-Campayo, J. (2010). A newer and broader definition of burnout. BMC Public Health, 10, 302.</li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-emerald-50 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-emerald-800 mb-2">あなたのバーンアウトタイプをチェック</p>
          <p className="text-xs text-emerald-600 mb-4">31問・約8分の無料セルフチェックで、タイプと回復の道筋がわかります。</p>
          <Link href="/check" className="group inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-full transition-colors">
            無料でチェックする <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </article>
    </div>
  )
}
