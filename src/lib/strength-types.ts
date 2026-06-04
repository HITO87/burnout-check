export type StrengthType = 'devotee' | 'perfectionist' | 'empath' | 'executor' | 'harmonizer' | 'seeker' | 'analyst' | 'creator'

export interface StrengthTypeInfo {
  id: StrengthType
  name: string
  strength: string
  oneLiner: string
  color: string
  gradient: [string, string]
}

export const STRENGTH_TYPES: Record<StrengthType, StrengthTypeInfo> = {
  devotee: {
    id: 'devotee',
    name: '献身の人',
    strength: '責任感と献身力',
    oneLiner: '人のために全力で動ける',
    color: '#ea580c',
    gradient: ['#ea580c', '#d97706'],
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'こだわりの人',
    strength: '妥協しない品質意識',
    oneLiner: '高い基準で成果を出せる',
    color: '#3b82f6',
    gradient: ['#1e3a5f', '#3b82f6'],
  },
  empath: {
    id: 'empath',
    name: '共感の人',
    strength: '深い共感力と観察力',
    oneLiner: '人の気持ちを繊細に感じ取れる',
    color: '#0d9488',
    gradient: ['#0d9488', '#0891b2'],
  },
  executor: {
    id: 'executor',
    name: '実行の人',
    strength: '自立心と実行力',
    oneLiner: '自分で動いて結果を出せる',
    color: '#374151',
    gradient: ['#374151', '#6b7280'],
  },
  harmonizer: {
    id: 'harmonizer',
    name: '調和の人',
    strength: '場を読む適応力',
    oneLiner: '場の空気を整えられる',
    color: '#7c3aed',
    gradient: ['#7c3aed', '#a855f7'],
  },
  seeker: {
    id: 'seeker',
    name: '探究の人',
    strength: '知的好奇心と成長欲求',
    oneLiner: '常に成長と新しい挑戦を求める',
    color: '#065f46',
    gradient: ['#065f46', '#10b981'],
  },
  analyst: {
    id: 'analyst',
    name: '分析の人',
    strength: '論理的思考と構造化力',
    oneLiner: '複雑な問題を整理して解決する',
    color: '#1e40af',
    gradient: ['#1e40af', '#6366f1'],
  },
  creator: {
    id: 'creator',
    name: '創造の人',
    strength: '発想力と可能性を見る目',
    oneLiner: '新しい可能性を見つけ出す',
    color: '#be185d',
    gradient: ['#be185d', '#ec4899'],
  },
}

export function getStrengthType(id: StrengthType): StrengthTypeInfo {
  return STRENGTH_TYPES[id]
}
