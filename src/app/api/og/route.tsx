import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const TYPE_OG: Record<string, { name: string; strength: string; from: string; to: string }> = {
  devotee: { name: '背負いすぎる献身家', strength: '責任感と献身力', from: '#ea580c', to: '#d97706' },
  perfectionist: { name: '求めすぎる職人気質', strength: '妥協しない品質意識', from: '#1e3a5f', to: '#3b82f6' },
  empath: { name: '溜め込みすぎる共感者', strength: '深い共感力と観察力', from: '#0d9488', to: '#0891b2' },
  executor: { name: '抱え込みすぎる実行者', strength: '自立心と実行力', from: '#374151', to: '#6b7280' },
  harmonizer: { name: '合わせすぎる調和者', strength: '場を読む適応力', from: '#7c3aed', to: '#a855f7' },
  seeker: { name: '考えすぎる探究者', strength: '知的好奇心と成長欲求', from: '#065f46', to: '#10b981' },
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const type = searchParams.get('type') ?? 'devotee'
  const score = searchParams.get('score') ?? '0'
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
        }}
      >
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
          燃え尽き度
        </div>
        <div style={{ fontSize: 80, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>
          {score}%
        </div>
        <div style={{ fontSize: 36, fontWeight: 'bold', color: 'white', marginBottom: 12 }}>
          {info.name}
        </div>
        <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
          隠された強み：{info.strength}
        </div>
        <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>
          burnout.hitone.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
