'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { decodeResult } from '@/lib/strength-questions'
import { STRENGTH_TYPES } from '@/lib/strength-types'
import type { StrengthType } from '@/lib/strength-types'
import { getNarrative, getCombinationText } from '@/lib/strength-narratives'

function ResultContent() {
  const searchParams = useSearchParams()
  const encoded = searchParams.get('r')

  if (!encoded) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center px-4">
        <p className="text-gray-500 text-sm">結果データが見つかりません。</p>
      </div>
    )
  }

  const result = decodeResult(encoded)
  if (!result) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center px-4">
        <p className="text-gray-500 text-sm">結果の読み込みに失敗しました。</p>
      </div>
    )
  }

  const primary = STRENGTH_TYPES[result.primary]
  const secondary = STRENGTH_TYPES[result.secondary]
  const narrative = getNarrative(result.primary)
  const combinationText = getCombinationText(result.primary, result.secondary)

  // スコアバー用：上位3タイプを計算
  const sortedScores = Object.entries(result.scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
  const maxScore = sortedScores[0][1] || 1

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      {/* ── ヒーロー ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${primary.gradient[0]}, ${primary.gradient[1]})` }}
      >
        <div className="max-w-lg mx-auto pt-14 pb-16 px-4 text-center relative z-10">
          <p className="text-white/50 text-xs tracking-widest mb-6">YOUR STRENGTH PROFILE</p>
          <h1 className="text-3xl font-bold text-white mb-2">{primary.name}</h1>
          <p className="text-white/70 text-sm mb-6">{primary.strength}</p>

          {/* メイン × サブ */}
          <div className="inline-flex flex-col items-center gap-1 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-[10px]">MAIN</span>
              <span className="text-white text-sm font-medium">{primary.name}</span>
            </div>
            <div className="w-8 h-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-[10px]">SUB</span>
              <span className="text-white text-sm font-medium">{secondary.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4 pb-20 relative z-10">

        {/* ── スコアバー ── */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8">
          <p className="text-xs text-gray-400 tracking-wider mb-4">STRENGTH SCORES</p>
          <div className="space-y-3">
            {sortedScores.map(([type, score]) => {
              const info = STRENGTH_TYPES[type as StrengthType]
              return (
                <div key={type}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700 font-medium">{info.name}</span>
                    <span className="text-xs text-gray-400">{score}pt</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(score / maxScore) * 100}%`,
                        background: `linear-gradient(90deg, ${info.gradient[0]}, ${info.gradient[1]})`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── 組み合わせテキスト ── */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8">
          <p className="text-xs text-gray-400 tracking-wider mb-3">あなただけの組み合わせ</p>
          <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
            {combinationText}
          </p>
        </div>

        {/* ── ① 承認 ── */}
        <Section color={primary.color}>
          <SectionLabel>ACKNOWLEDGMENT</SectionLabel>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            あなたは「{primary.name}」。
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            こんな経験に、心当たりはありませんか。
          </p>
          <div className="space-y-4 mb-6">
            {narrative.acknowledgment.episodes.map((ep, i) => (
              <p key={i} className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
                {ep}
              </p>
            ))}
          </div>
          <p className="text-[15px] text-gray-800 font-medium leading-relaxed whitespace-pre-line">
            {narrative.acknowledgment.closing}
          </p>
        </Section>

        {/* ── ② 発見 ── */}
        <Section color={primary.color}>
          <SectionLabel>DISCOVERY</SectionLabel>
          <p className="text-xs text-gray-400 mb-2">ここから先は、たぶん初めて聞く話です。</p>
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            {narrative.discovery.title}
          </h2>
          <div className="space-y-4">
            {narrative.discovery.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-[15px] text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </Section>

        {/* ── ③ 緊張 ── */}
        <Section color={primary.color}>
          <SectionLabel>YOUR PATTERN</SectionLabel>
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            あなたの脳で毎日起きていること
          </h2>
          {/* ループ図 */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 font-mono text-xs text-gray-600 space-y-1.5">
            {narrative.tension.loopSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                {step.startsWith('★') ? (
                  <span className="text-amber-500 font-bold whitespace-pre-line">{step}</span>
                ) : (
                  <>
                    <span className="text-gray-300 select-none">{i < narrative.tension.loopSteps.length - 1 ? '↓' : '↻'}</span>
                    <span>{step}</span>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {narrative.tension.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-[15px] text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </Section>

        {/* ── ④ 希望 ── */}
        <Section color={primary.color}>
          <SectionLabel>HOPE</SectionLabel>
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            変える方法は、意外なほどシンプルです
          </h2>
          <div className="space-y-4 mb-8">
            {narrative.hope.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-[15px] text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* 練習方法 */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <p className="text-xs text-gray-400 tracking-wider mb-3">具体的な練習方法</p>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <span className="text-xs text-gray-400">いつ：</span>
                <p className="mt-0.5">{narrative.hope.practice.when}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">何を：</span>
                <p className="mt-0.5">{narrative.hope.practice.what}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">どう：</span>
                <p className="mt-0.5">{narrative.hope.practice.how}</p>
              </div>
            </div>
          </div>

          {/* ×と○の例 */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-xs text-red-400 mb-1">× 粗い</p>
              <p className="text-sm text-red-700">{narrative.hope.practice.exampleBad}</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4">
              <p className="text-xs text-emerald-500 mb-1">○ 精密</p>
              <p className="text-sm text-emerald-800">{narrative.hope.practice.exampleGood}</p>
            </div>
          </div>

          <p className="text-[15px] text-gray-700 leading-relaxed font-medium">
            {narrative.hope.result}
          </p>
        </Section>

        {/* ── ⑤ 行動 ── */}
        <Section color={primary.color}>
          <SectionLabel>NEXT STEP</SectionLabel>
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            ここまで読んで、「やってみよう」と思えたなら
          </h2>
          <div className="space-y-4 mb-8">
            {narrative.action.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-[15px] text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* みどりの問いかけ */}
          <div className="bg-emerald-50 rounded-xl p-5 mb-6">
            <p className="text-xs text-emerald-600 mb-3">みどりは、毎日あなたに問いを投げます。</p>
            <div className="space-y-2">
              {narrative.action.midoriQuestions.map((q, i) => (
                <p key={i} className="text-sm text-emerald-800 leading-relaxed">
                  「{q}」
                </p>
              ))}
            </div>
          </div>

          <p className="text-[15px] text-gray-800 font-medium leading-relaxed mb-10">
            {narrative.action.closingMetaphor}
          </p>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://hitone.app"
              className="inline-block w-full max-w-xs px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-lg shadow-emerald-200/50 transition-all hover:shadow-xl text-center"
            >
              この気づきを、毎日の習慣にする
              <br />
              <span className="text-xs text-emerald-200">7日間無料・1日3分</span>
            </a>
            <p className="text-[10px] text-gray-400 mt-3">
              クレジットカード不要・いつでもやめられます
            </p>
          </div>
        </Section>
      </div>
    </div>
  )
}

function Section({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="relative mb-8">
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full opacity-20"
        style={{ backgroundColor: color }}
      />
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {children}
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] text-gray-400 tracking-widest mb-4">{children}</p>
  )
}

export default function StrengthResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center">
          <p className="text-gray-400 text-sm">結果を読み込んでいます...</p>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
