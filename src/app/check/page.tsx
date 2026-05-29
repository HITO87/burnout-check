'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS, SCALE_LABELS } from '@/lib/questions'

// Section AとBの境界（Q19の次=index 19がQ20=Section B開始）
const SECTION_B_START = 19

export default function CheckPage() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitting, setSubmitting] = useState(false)
  const [showMidMessage, setShowMidMessage] = useState(false)

  const question = QUESTIONS[current]
  const total = QUESTIONS.length
  const remaining = total - current - 1
  const progress = Math.round((current / total) * 100)

  const handleSelect = useCallback(async (value: number) => {
    const key = `q${question.id}`
    const newAnswers = { ...answers, [key]: value }
    setAnswers(newAnswers)

    // Section A→B の境界で中間メッセージを表示
    if (current === SECTION_B_START - 1) {
      setShowMidMessage(true)
      return
    }

    if (current < total - 1) {
      setCurrent(current + 1)
    } else {
      setSubmitting(true)
      try {
        const res = await fetch('/api/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers }),
        })
        const data = await res.json()
        if (data.id) {
          router.push(`/result/${data.id}`)
        }
      } catch {
        setSubmitting(false)
      }
    }
  }, [answers, current, total, question.id, router])

  const handleBack = () => {
    if (current > 0) setCurrent(current - 1)
  }

  // 中間メッセージ画面
  if (showMidMessage) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <span className="text-emerald-600 text-lg">✓</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">ここまでお疲れさまでした</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-2">半分終わりました！</p>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            ここからは、あなたの燃え尽きタイプを判定するための質問です。あと12問です。
          </p>
          <button
            onClick={() => {
              setShowMidMessage(false)
              setCurrent(SECTION_B_START)
            }}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full transition-colors shadow-lg shadow-emerald-200/50"
          >
            続ける
          </button>
        </div>
      </div>
    )
  }

  // ローディング画面
  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
        <div className="text-center max-w-xs">
          <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-base font-medium text-gray-800 mb-2">あなたの回答を分析しています</p>
          <div className="space-y-2 mt-6 text-left">
            {[
              '燃え尽き度スコアを算出中...',
              '3つの下位尺度を分析中...',
              '6タイプの判定中...',
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 text-xs text-gray-400 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* プログレスバー + 残り問題数 */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <button
            onClick={handleBack}
            disabled={current === 0}
            className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-0 transition-opacity"
          >
            ← 戻る
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">あと{remaining}問</span>
            <span className="text-[10px] text-gray-300">{current + 1}/{total}</span>
          </div>
        </div>
      </div>

      {/* 質問 */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <p className="text-xs text-emerald-600 font-medium mb-3">{question.sectionLabel}</p>
          <h2 className="text-lg font-bold text-gray-800 leading-relaxed mb-10">
            {question.text}
          </h2>

          <div className="space-y-2">
            {SCALE_LABELS.map(({ value, label }) => {
              const selected = answers[`q${question.id}`] === value
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl border-2 transition-all text-left ${
                    selected
                      ? 'border-emerald-400 bg-emerald-50'
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    selected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-300 text-gray-400'
                  }`}>
                    {value}
                  </span>
                  <span className={`text-sm ${selected ? 'text-emerald-700 font-medium' : 'text-gray-600'}`}>
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
