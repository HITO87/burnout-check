export type BurnoutType = 'frenetic' | 'underchallenged' | 'wornout' | 'balanced'
export type Severity = 'low' | 'moderate' | 'high' | 'very_high'

export interface CheckResult {
  answers: Record<string, number>
  totalScore: number
  personalScore: number
  workScore: number
  interpersonalScore: number
  primaryType: BurnoutType
  secondaryType: BurnoutType | null
  freneticScore: number
  underchallengedScore: number
  wornoutScore: number
  severity: Severity
}

function avg(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length
}

function toPercent(rawAvg: number): number {
  // 1-7 scale → 0-100
  return Math.round(((rawAvg - 1) / 6) * 100)
}

function getSeverity(score: number): Severity {
  if (score <= 25) return 'low'
  if (score <= 50) return 'moderate'
  if (score <= 75) return 'high'
  return 'very_high'
}

export function calculateScores(answers: Record<string, number>): CheckResult {
  const get = (ids: number[]) => ids.map(id => answers[`q${id}`] ?? 1)

  // Section A: CBI下位尺度（1-7 → 0-100）
  const personalRaw = get([1, 2, 3, 4, 5, 6])
  const workRaw = get([7, 8, 9, 10, 11, 12, 13])
  const interpersonalRaw = get([14, 15, 16, 17, 18, 19])

  const personalScore = toPercent(avg(personalRaw))
  const workScore = toPercent(avg(workRaw))
  const interpersonalScore = toPercent(avg(interpersonalRaw))

  // 総合スコア = 19問の平均
  const allCBI = [...personalRaw, ...workRaw, ...interpersonalRaw]
  const totalScore = toPercent(avg(allCBI))

  // Section B: BCSQ-12タイプ判定（1-7の平均、そのまま）
  const freneticScore = avg(get([20, 21, 22, 23]))
  const underchallengedScore = avg(get([24, 25, 26, 27]))
  const wornoutScore = avg(get([28, 29, 30, 31]))

  // タイプ判定
  const types: { type: BurnoutType; score: number }[] = [
    { type: 'frenetic', score: freneticScore },
    { type: 'underchallenged', score: underchallengedScore },
    { type: 'wornout', score: wornoutScore },
  ]
  types.sort((a, b) => b.score - a.score)

  // 全て低い場合はbalanced
  const allLow = types.every(t => t.score < 3)
  const primaryType: BurnoutType = allLow ? 'balanced' : types[0].type
  const secondaryType: BurnoutType | null = allLow ? null : (types[1].score >= 3 ? types[1].type : null)

  return {
    answers,
    totalScore,
    personalScore,
    workScore,
    interpersonalScore,
    primaryType,
    secondaryType,
    freneticScore: Math.round(freneticScore * 10) / 10,
    underchallengedScore: Math.round(underchallengedScore * 10) / 10,
    wornoutScore: Math.round(wornoutScore * 10) / 10,
    severity: getSeverity(totalScore),
  }
}
