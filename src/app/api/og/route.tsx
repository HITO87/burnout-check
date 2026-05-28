import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const TYPE_NAMES: Record<string, { name: string; from: string; to: string }> = {
  frenetic: { name: '熱狂型バーンアウト', from: '#f97316', to: '#dc2626' },
  underchallenged: { name: '退屈型バーンアウト', from: '#6b7280', to: '#3b82f6' },
  wornout: { name: '消耗型バーンアウト', from: '#1e3a5f', to: '#7c3aed' },
  balanced: { name: 'バランス型', from: '#059669', to: '#10b981' },
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const type = searchParams.get('type') ?? 'balanced'
  const score = searchParams.get('score') ?? '0'
  const info = TYPE_NAMES[type] ?? TYPE_NAMES.balanced

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
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
          燃え尽き度
        </div>
        <div style={{ fontSize: 96, fontWeight: 'bold', color: 'white', marginBottom: 16 }}>
          {score}%
        </div>
        <div style={{ fontSize: 40, fontWeight: 'bold', color: 'white', marginBottom: 40 }}>
          {info.name}
        </div>
        <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)' }}>
          burnout.hitone.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
