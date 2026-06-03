import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const TYPE_OG: Record<string, { name: string; strength: string; phrase: string; from: string; to: string }> = {
  devotee: { name: '献身の人', strength: '責任感と献身力', phrase: '人のために全力で動ける、あなたの才能', from: '#ea580c', to: '#d97706' },
  perfectionist: { name: 'こだわりの人', strength: '妥協しない品質意識', phrase: '高い基準で成果を出せる、あなたの才能', from: '#1e3a5f', to: '#3b82f6' },
  empath: { name: '共感の人', strength: '深い共感力と観察力', phrase: '人の気持ちを繊細に感じ取れる、あなたの才能', from: '#0d9488', to: '#0891b2' },
  executor: { name: '実行の人', strength: '自立心と実行力', phrase: '自分で動いて結果を出せる、あなたの才能', from: '#374151', to: '#6b7280' },
  harmonizer: { name: '調和の人', strength: '場を読む適応力', phrase: '場の空気を整えられる、あなたの才能', from: '#7c3aed', to: '#a855f7' },
  seeker: { name: '探究の人', strength: '知的好奇心と成長欲求', phrase: '常に成長を求められる、あなたの才能', from: '#065f46', to: '#10b981' },
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const type = searchParams.get('type') ?? 'devotee'
  const info = TYPE_OG[type] ?? TYPE_OG.devotee

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${info.from}, ${info.to})`,
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* ロゴ */}
        <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', letterSpacing: '4px', marginBottom: 40 }}>
          HITONE
        </div>

        {/* 隠された強み（最大フォント） */}
        <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
          隠された強み
        </div>
        <div style={{ fontSize: 56, fontWeight: 'bold', color: 'white', marginBottom: 24 }}>
          {info.strength}
        </div>

        {/* タイプ名 */}
        <div style={{
          fontSize: 28, fontWeight: 'bold', color: 'white',
          backgroundColor: 'rgba(255,255,255,0.15)',
          padding: '12px 32px', borderRadius: '40px', marginBottom: 24,
        }}>
          {info.name}
        </div>

        {/* 共感フレーズ */}
        <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginBottom: 40 }}>
          {info.phrase}
        </div>

        {/* CTA + URL */}
        <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>
          あなたもチェック → burnout.hitone.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
