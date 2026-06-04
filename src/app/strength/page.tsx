'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { STRENGTH_QUESTIONS, calculateStrengthResult, encodeResult } from '@/lib/strength-questions'

export default function StrengthCheckPage() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  const question = STRENGTH_QUESTIONS[current]
  const total = STRENGTH_QUESTIONS.length
  const progress = Math.round(((current) / total) * 100)

  const handleSelect = useCallback((choiceIdx: number) => {
    const newAnswers = { ...answers, [question.id]: choiceIdx }
    setAnswers(newAnswers)

    if (current < total - 1) {
      setTimeout(() => setCurrent(current + 1), 300)
    } else {
      // 完了 → 結果ページへ
      const result = calculateStrengthResult(newAnswers)
      const encoded = encodeResult(result)
      router.push(`/strength/result?r=${encoded}`)
    }
  }, [answers, current, total, question.id, router])

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col">
      {/* ヘッダー */}
      <div className="px-4 pt-6 pb-2">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-gray-400">{current + 1} / {total}</p>
            <p className="text-xs text-gray-400">約3分</p>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 質問 */}
      <div className="flex-1 flex items-center px-4">
        <div className="max-w-lg mx-auto w-full">
          <h2 className="text-lg font-bold text-gray-900 mb-8 leading-relaxed">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.choices.map((choice, idx) => {
              const isSelected = answers[question.id] === idx
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                      : 'border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/50 text-gray-700'
                  }`}
                >
                  <p className="text-[15px] leading-relaxed">{choice.label}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* フッター */}
      <div className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          {current > 0 && (
            <button
              onClick={() => setCurrent(current - 1)}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              ← 前の質問
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
