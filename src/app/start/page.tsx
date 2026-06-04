import Link from 'next/link'
import { ChevronRight, Shield, Clock, BarChart3 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '隠れた強みを詳しく分析 | HITONE',
  description: '31問のセルフチェックで、あなたの隠れた強みを科学的に分析。無料・約8分。',
}

export default function StartPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center py-16">
        {/* バッジ */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-medium px-4 py-1.5 rounded-full mb-8 border border-emerald-100">
          <Shield className="w-3.5 h-3.5" />
          診断メーカーの結果をさらに深掘り
        </div>

        {/* メイン */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
          あなたの「隠れた強み」を<br />もっと詳しく分析する
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xs mx-auto">
          31問の科学的なチェックで、強みの使いすぎパターンと具体的な活かし方がわかります。
        </p>

        {/* 特徴 */}
        <div className="flex justify-center gap-6 mb-10">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            約8分
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <BarChart3 className="w-3.5 h-3.5" />
            無料
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Shield className="w-3.5 h-3.5" />
            登録不要
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/check"
          className="group inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-lg shadow-emerald-200/50 transition-all hover:shadow-xl"
        >
          詳しいチェックを始める
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <p className="text-[10px] text-gray-400 mt-4">医学的診断ではありません</p>
      </div>
    </div>
  )
}
