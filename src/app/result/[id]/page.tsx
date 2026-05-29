import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { TYPE_INFO, SEVERITY_INFO } from '@/lib/type-descriptions'
import type { BurnoutType, Severity } from '@/lib/scoring'
import type { Metadata } from 'next'
import BodyMechanism from '@/components/BodyMechanism'
import PaidReportTeaser from '@/components/PaidReportTeaser'

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
  const primaryType = result.primary_type as BurnoutType
  const type = TYPE_INFO[primaryType]
  const severity = SEVERITY_INFO[result.severity as Severity]
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://burnout.hitone.app'
  const shareText = `燃え尽きタイプ診断やったら【${type.name}】だった。「${type.hiddenStrength}の使いすぎ」って言われて刺さった…\nあなたは何タイプ？\n→ ${baseUrl}`

  return (
    <div className="min-h-screen bg-[#FFFDF7]">

      {/* ヒーロー: タイプ別イラスト + グラデーションオーバーレイ */}
      <div className="relative overflow-hidden">
        {/* 背景画像（ベース） */}
        <div className="absolute inset-0">
          <div className="w-full h-full" style={{ backgroundImage: `url(/types/${primaryType}.png)`, backgroundSize: 'cover', backgroundPosition: 'center 60%' }} />
        </div>
        {/* グラデーションオーバーレイ（画像の上に半透明で重ねる） */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${type.gradientFrom}cc, ${type.gradientTo}cc)` }} />

        <div className="max-w-lg mx-auto pt-12 pb-16 px-4 text-center relative z-10">
          <p className="text-white/60 text-xs tracking-wider mb-6">YOUR BURNOUT PROFILE</p>

          {/* スコアゲージ */}
          <div className="relative w-36 h-36 mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 264} 264`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{score}</span>
              <span className="text-white/60 text-[10px]">/ 100</span>
            </div>
          </div>

          {/* タイプ名 */}
          <h1 className="text-2xl font-bold text-white mb-2">{type.name}</h1>
          <p className="text-white/70 text-xs">隠された強み：{type.hiddenStrength}</p>

          {/* 重症度 */}
          <div className="mt-4 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full">
            {severity.emoji} {severity.label}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4 pb-16 relative z-10">

        {/* 重症度メッセージ */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">{severity.message}</p>
        </div>

        {/* 3下位尺度 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <p className="text-xs text-gray-400 tracking-wider mb-4">SUBSCALES</p>
          <div className="space-y-4">
            {[
              { label: '心身の疲労', sub: 'Personal', score: personalScore },
              { label: '仕事との関係', sub: 'Work-related', score: workScore },
              { label: '人との関係', sub: 'Interpersonal', score: interpersonalScore },
            ].map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                    <span className="text-[10px] text-gray-400 ml-2">{item.sub}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">{item.score}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.score}%`,
                      background: item.score >= 76 ? 'linear-gradient(90deg, #f97316, #dc2626)' : item.score >= 51 ? 'linear-gradient(90deg, #eab308, #f97316)' : item.score >= 26 ? 'linear-gradient(90deg, #10b981, #eab308)' : '#10b981',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* タイプ詳細 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          {/* タイプカードヘッダー */}
          <div className="p-5 border-b border-gray-50" style={{ background: `linear-gradient(135deg, ${type.gradientFrom}08, ${type.gradientTo}08)` }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg leading-tight text-center px-1" style={{ background: `linear-gradient(135deg, ${type.gradientFrom}, ${type.gradientTo})` }}>
                {type.name.charAt(0)}
              </div>
              <div>
                <h2 className={`text-lg font-bold ${type.color}`}>{type.name}</h2>
                <p className="text-xs text-gray-400">隠された強み：{type.hiddenStrength}</p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-500 leading-relaxed mb-3 italic">{type.catchphrase}</p>
            <p className="text-sm text-gray-700 leading-relaxed">{type.body}</p>
          </div>
        </div>

        {/* 身体メカニズム図解 */}
        <BodyMechanism type={primaryType} />

        {/* 有料レポート誘導（blur方式） */}
        <PaidReportTeaser type={primaryType} checkResultId={id} />

        {/* シェア */}
        <div className="text-center mb-8">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            シェアする
          </a>
          <p className="text-xs text-gray-400 mt-2">あなたのタイプを友達と比べてみよう</p>
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
              target="_blank" rel="noopener noreferrer"
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

        <div className="text-center mt-6">
          <a href="/check" className="text-xs text-gray-400 hover:text-emerald-600 underline transition-colors">
            もう一度チェックする
          </a>
        </div>
      </div>
    </div>
  )
}
