export interface QuickQuestion {
  id: number
  text: string
  type: 'frenetic' | 'underchallenged' | 'wornout'
}

export const QUICK_QUESTIONS: QuickQuestion[] = [
  { id: 1, text: '休憩を取ることに罪悪感を感じる', type: 'frenetic' },
  { id: 2, text: '仕事に刺激や成長の実感がない', type: 'underchallenged' },
  { id: 3, text: '努力しても状況が変わらないと感じる', type: 'wornout' },
  { id: 4, text: '仕事以外に体力が残っていない', type: 'frenetic' },
  { id: 5, text: '朝起きた瞬間から疲れている', type: 'wornout' },
]

export const QUICK_SCALE = [
  { value: 1, label: 'まったくない' },
  { value: 2, label: 'たまにある' },
  { value: 3, label: '時々ある' },
  { value: 4, label: 'よくある' },
  { value: 5, label: '常にある' },
]

export type QuickType = 'frenetic' | 'underchallenged' | 'wornout' | 'balanced'

export function calcQuickType(answers: Record<number, number>): { type: QuickType; score: number } {
  const scores = { frenetic: 0, underchallenged: 0, wornout: 0 }
  const counts = { frenetic: 0, underchallenged: 0, wornout: 0 }

  for (const q of QUICK_QUESTIONS) {
    const val = answers[q.id] ?? 1
    scores[q.type] += val
    counts[q.type]++
  }

  const avgs = {
    frenetic: scores.frenetic / (counts.frenetic || 1),
    underchallenged: scores.underchallenged / (counts.underchallenged || 1),
    wornout: scores.wornout / (counts.wornout || 1),
  }

  const entries = Object.entries(avgs) as [QuickType, number][]
  entries.sort((a, b) => b[1] - a[1])

  const totalAvg = (scores.frenetic + scores.underchallenged + scores.wornout) / 5
  const overallScore = Math.round(((totalAvg - 1) / 4) * 100)

  if (entries[0][1] < 2.5) return { type: 'balanced', score: overallScore }
  return { type: entries[0][0], score: overallScore }
}
