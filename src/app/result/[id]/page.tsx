import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { TYPE_INFO, SEVERITY_INFO } from '@/lib/type-descriptions'
import type { BurnoutType, Severity } from '@/lib/scoring'
import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('check_results').select('total_score, primary_type').eq('id', id).maybeSingle()
  if (!data) return { title: '結果 | HITONE バーンアウトチェック' }

  const type = TYPE_INFO[data.primary_type as BurnoutType]
  const score = Math.round(data.total_score)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://burnout.hitone.app'

  return {
    title: `燃え尽き度${score}% — ${type.name} | HITONE`,
    description: 'あなたの燃え尽きタイプは？8分の無料チェックで科学的に分析',
    openGraph: {
      title: `燃え尽き度${score}% — ${type.name} | HITONE`,
      description: 'あなたの燃え尽きタイプは？8分の無料チェックで科学的に分析',
      images: [`${baseUrl}/api/og?type=${data.primary_type}&score=${score}`],
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function ResultPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: result } = await supabase.from('check_results').select('*').eq('id', id).maybeSingle()

  if (!result) notFound()

  const score = Math.round(result.total_score)
  const personalScore = Math.round(result.personal_score)
  const workScore = Math.round(result.work_score)
  const interpersonalScore = Math.round(result.interpersonal_score)
  const type = TYPE_INFO[result.primary_type as BurnoutType]
  const severity = SEVERITY_INFO[result.severity as Severity]
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://burnout.hitone.app'
  const shareUrl = `${baseUrl}/result/${id}`
  const shareText = `燃え尽き度${score}%、"${type.name}"だった...\nあなたは何タイプ？\n→ ${baseUrl}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="max-w-lg mx-auto pt-8 pb-16">

        {/* スコア */}
        <div className="text-center mb-8">
          <p className="text-xs text-gray-400 mb-2">あなたの燃え尽き度</p>
          <div className="relative w-40 h-40 mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f4f6" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke={score >= 76 ? '#dc2626' : score >= 51 ? '#f97316' : score >= 26 ? '#eab308' : '#10b981'}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 264} 264`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">{score}</span>
            </div>
          </div>
          <p className={`text-sm font-medium ${severity.color}`}>
            {severity.emoji} {severity.label}
          </p>
          <p className="text-xs text-gray-500 mt-1">{severity.message}</p>
        </div>

        {/* 3下位尺度 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <p className="text-xs text-gray-400 mb-4">内訳</p>
          <div className="space-y-4">
            {[
              { label: '心身の疲労', score: personalScore },
              { label: '仕事との関係', score: workScore },
              { label: '人との関係', score: interpersonalScore },
            ].map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-medium text-gray-800">{item.score}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.score >= 76 ? '#dc2626' : item.score >= 51 ? '#f97316' : item.score >= 26 ? '#eab308' : '#10b981',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* タイプ */}
        <div className={`rounded-2xl p-6 mb-6 ${type.bgColor}`}>
          <p className="text-xs text-gray-400 mb-2">あなたのタイプ</p>
          <h2 className={`text-xl font-bold mb-3 ${type.color}`}>
            {type.emoji} {type.name}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">{type.body}</p>
          <div className="bg-white/60 rounded-xl p-4">
            <p className="text-xs text-gray-500 font-medium mb-2">あなたの身体で起きていること</p>
            <p className="text-xs text-gray-600 leading-relaxed">{type.mechanism}</p>
          </div>
        </div>

        {/* シェア */}
        <div className="text-center mb-6">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Xでシェアする
          </a>
          <p className="text-xs text-gray-400 mt-2">あなたのタイプを友達と比べてみよう</p>
        </div>

        {/* 有料レポートCTA（Phase 2用プレースホルダー） */}
        <div className="bg-emerald-50 rounded-2xl p-6 mb-6 text-center">
          <p className="text-sm font-medium text-emerald-800 mb-2">あなた専用の回復ロードマップ</p>
          <p className="text-xs text-emerald-600 mb-4">詳細な構造分析・30日間の回復プラン・タイプ別のアドバイスが含まれます</p>
          <div className="inline-block px-6 py-3 bg-emerald-200 text-emerald-700 text-sm font-medium rounded-full">
            準備中（近日公開）
          </div>
        </div>

        {/* 76-100: 専門機関案内 */}
        {result.severity === 'very_high' && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
            <p className="text-sm font-medium text-red-800 mb-2">専門家への相談をおすすめします</p>
            <p className="text-xs text-red-600 mb-3">
              あなたのスコアは非常に高い水準です。つらい状況が続いている場合は、心療内科等の専門医療機関へご相談ください。
            </p>
            <a
              href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryou/teikyouseido/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-red-700 underline"
            >
              医療機関を探す（厚生労働省）→
            </a>
          </div>
        )}

        {/* 免責 */}
        <div className="text-center mt-8">
          <p className="text-[10px] text-gray-400 leading-relaxed max-w-xs mx-auto">
            ※本チェックは医学的診断ではなく、セルフチェックの目安として提供しています。
            結果は個人の主観的回答に基づいており、医師の診断に代わるものではありません。
            つらい状況が続いている場合は、心療内科等の専門医療機関へご相談ください。
          </p>
        </div>

        {/* もう一度チェック */}
        <div className="text-center mt-6">
          <a href="/check" className="text-xs text-gray-400 hover:text-emerald-600 underline">
            もう一度チェックする
          </a>
        </div>
      </div>
    </div>
  )
}
