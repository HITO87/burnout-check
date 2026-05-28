'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { QUICK_QUESTIONS, QUICK_SCALE, calcQuickType } from '@/lib/quick-questions'
import { TYPE_INFO } from '@/lib/type-descriptions'
import { ChevronRight } from 'lucide-react'
import type { BurnoutType } from '@/lib/scoring'

export default function QuickCheckPage() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<{ type: BurnoutType; score: number } | null>(null)

  const question = QUICK_QUESTIONS[current]
  const total = QUICK_QUESTIONS.length

  const handleSelect = useCallback((value: number) => {
    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)

    if (current < total - 1) {
      setCurrent(current + 1)
    } else {
      setResult(calcQuickType(newAnswers))
    }
  }, [answers, current, total, question])

  // 結果画面
  if (result) {
    const type = TYPE_INFO[result.type]
    const shareText = `燃え尽き傾向${result.score}%、"${type.name}"だった...\n1分でわかる簡易チェック→ https://burnout.hitone.app/quick\n\n本格版（31問）→ https://burnout.hitone.app`

    return (
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-lg" style={{ background: `linear-gradient(135deg, ${type.gradientFrom}, ${type.gradientTo})` }}>
            {result.score}%
          </div>
          <p className="text-xs text-gray-400 mb-2">あなたの燃え尽き傾向</p>
          <h1 className={`text-2xl font-bold mb-2 ${type.color}`}>{type.name}</h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-8">{type.summary}</p>

          <Link
            href="/check"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-lg shadow-emerald-200/50 transition-all mb-4 w-full justify-center"
          >
            本格版で詳しく分析する（31問）
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            結果をシェア
          </a>

          <p className="text-[10px] text-gray-400 mt-6">※簡易版の結果です。本格版（31問）でより正確な分析ができます。</p>
        </div>
      </div>
    )
  }

  // 質問画面
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* プログレス */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${((current) / total) * 100}%` }} />
        </div>
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <button onClick={() => current > 0 && setCurrent(current - 1)} disabled={current === 0} className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-0">← 戻る</button>
          <span className="text-xs text-gray-400">{current + 1} / {total}</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <p className="text-xs text-emerald-600 font-medium mb-3">1分でわかる簡易チェック</p>
          <h2 className="text-lg font-bold text-gray-800 leading-relaxed mb-10">{question.text}</h2>
          <div className="space-y-2">
            {QUICK_SCALE.map(({ value, label }) => {
              const selected = answers[question.id] === value
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl border-2 transition-all text-left ${
                    selected ? 'border-emerald-400 bg-emerald-50' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    selected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-300 text-gray-400'
                  }`}>{value}</span>
                  <span className={`text-sm ${selected ? 'text-emerald-700 font-medium' : 'text-gray-600'}`}>{label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
