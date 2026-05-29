// 3つの基本バーンアウトサブタイプ（BCSQ-12）
export type BaseSubtype = 'frenetic' | 'underchallenged' | 'wornout'

// 6タイプ（UI表示用）
export type BurnoutType =
  | 'devotee'        // 背負いすぎる献身家（熱狂型: Q22-Q23高）
  | 'perfectionist'  // 求めすぎる職人気質（熱狂型: Q20-Q21高）
  | 'empath'         // 溜め込みすぎる共感者（消耗型: Q30-Q31高）
  | 'executor'       // 抱え込みすぎる実行者（消耗型: Q28-Q29高）
  | 'harmonizer'     // 合わせすぎる調和者（対人バーンアウトが最高）
  | 'seeker'         // 考えすぎる探究者（退屈型）

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
  return Math.round(((rawAvg - 1) / 6) * 100)
}

function getSeverity(score: number): Severity {
  if (score <= 25) return 'low'
  if (score <= 50) return 'moderate'
  if (score <= 75) return 'high'
  return 'very_high'
}

// 基本3タイプ → 6タイプに変換
function determineDetailedType(
  baseType: BaseSubtype,
  answers: Record<string, number>,
  interpersonalScore: number,
  personalScore: number,
  workScore: number,
): BurnoutType {
  // 対人関連バーンアウト（Q14-Q19）が最高スコアの場合 → 合わせすぎる調和者
  if (interpersonalScore >= personalScore && interpersonalScore >= workScore && interpersonalScore >= 40) {
    return 'harmonizer'
  }

  switch (baseType) {
    case 'frenetic': {
      // Q20-Q21（成果執着）vs Q22-Q23（没頭・休めない）
      const perfScore = avg([answers.q20 ?? 1, answers.q21 ?? 1])
      const devoteeScore = avg([answers.q22 ?? 1, answers.q23 ?? 1])
      return devoteeScore >= perfScore ? 'devotee' : 'perfectionist'
    }
    case 'underchallenged':
      return 'seeker'
    case 'wornout': {
      // Q28-Q29（評価不足・努力放棄）vs Q30-Q31（統制感喪失・感情抑制）
      const executorScore = avg([answers.q28 ?? 1, answers.q29 ?? 1])
      const empathScore = avg([answers.q30 ?? 1, answers.q31 ?? 1])
      return empathScore >= executorScore ? 'empath' : 'executor'
    }
  }
}

export function calculateScores(answers: Record<string, number>): CheckResult {
  const get = (ids: number[]) => ids.map(id => answers[`q${id}`] ?? 1)

  // Section A: CBI下位尺度
  const personalRaw = get([1, 2, 3, 4, 5, 6])
  const workRaw = get([7, 8, 9, 10, 11, 12, 13])
  const interpersonalRaw = get([14, 15, 16, 17, 18, 19])

  const personalScore = toPercent(avg(personalRaw))
  const workScore = toPercent(avg(workRaw))
  const interpersonalScore = toPercent(avg(interpersonalRaw))

  const allCBI = [...personalRaw, ...workRaw, ...interpersonalRaw]
  const totalScore = toPercent(avg(allCBI))

  // Section B: BCSQ-12 基本3タイプスコア
  const freneticScore = avg(get([20, 21, 22, 23]))
  const underchallengedScore = avg(get([24, 25, 26, 27]))
  const wornoutScore = avg(get([28, 29, 30, 31]))

  // 基本3タイプの判定
  const baseTypes: { type: BaseSubtype; score: number }[] = [
    { type: 'frenetic', score: freneticScore },
    { type: 'underchallenged', score: underchallengedScore },
    { type: 'wornout', score: wornoutScore },
  ]
  baseTypes.sort((a, b) => b.score - a.score)

  const allLow = baseTypes.every(t => t.score < 3)

  // 6タイプへの変換
  const primaryBase = allLow ? 'frenetic' : baseTypes[0].type
  const primaryType = allLow
    ? 'devotee' as BurnoutType // デフォルト
    : determineDetailedType(primaryBase, answers, interpersonalScore, personalScore, workScore)

  // セカンダリタイプ
  let secondaryType: BurnoutType | null = null
  if (!allLow && baseTypes[1].score >= 3) {
    const secondaryBase = baseTypes[1].type
    secondaryType = determineDetailedType(secondaryBase, answers, interpersonalScore, personalScore, workScore)
    // プライマリと同じ場合はnull
    if (secondaryType === primaryType) secondaryType = null
  }

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
