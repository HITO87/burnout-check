import type { BurnoutType, Severity } from './scoring'

export interface TypeInfo {
  name: string
  nameEn: string
  emoji: string
  color: string          // tailwind text color
  bgColor: string        // tailwind bg color
  gradientFrom: string   // OGP gradient
  gradientTo: string
  summary: string
  body: string
  mechanism: string
}

export const TYPE_INFO: Record<BurnoutType, TypeInfo> = {
  frenetic: {
    name: '熱狂型バーンアウト',
    nameEn: 'Frenetic',
    emoji: '🔥',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    gradientFrom: '#f97316',
    gradientTo: '#dc2626',
    summary: '止まれない。休めない。でも「もっとやらなきゃ」と自分を追い込み続ける。',
    body: '熱狂型は、仕事に全力で向き合うからこそ燃え尽きます。キャパシティを超えても引き受け、休憩に罪悪感を感じ、成果への執着が止まりません。「頑張っている」ことが自己の存在証明になっているため、止まることへの恐怖があります。',
    mechanism: '熱狂型の方は、HPA軸（ストレス反応系）が過活動状態にあり、コルチゾール（ストレスホルモン）が高い状態が続いています。交感神経が優位になりやすく、身体が常に「戦闘モード」のままです。回復には「止まる仕組み」を意図的に作ることが重要です。',
  },
  underchallenged: {
    name: '退屈型バーンアウト',
    nameEn: 'Underchallenged',
    emoji: '😶',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    gradientFrom: '#6b7280',
    gradientTo: '#3b82f6',
    summary: '刺激がない。成長がない。何のために働いているのかわからない。',
    body: '退屈型は、仕事に意味や成長を見出せなくなった時に起きます。能力が活かされていない感覚、変化のない日々、単調な繰り返し。表面上は問題なく見えても、内面では「このままでいいのか」という焦燥感が蓄積しています。',
    mechanism: '退屈型の方は、ドーパミン報酬系の反応が鈍化している可能性があります。新しい刺激や達成感に対する神経の反応が弱くなり、動機づけの低下や無気力感として現れます。「小さな新しいこと」を意図的に取り入れることが回復の鍵です。',
  },
  wornout: {
    name: '消耗型バーンアウト',
    nameEn: 'Worn-out',
    emoji: '🪫',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    gradientFrom: '#1e3a5f',
    gradientTo: '#7c3aed',
    summary: '何をしても報われない。努力する気力すら残っていない。',
    body: '消耗型は、長期間にわたって努力が報われない経験が積み重なった結果です。評価されない、コントロールできない、状況が変わらない。やがて「どうせ無駄だ」という学習性無力感に陥り、努力そのものを放棄するようになります。',
    mechanism: '消耗型の方は、HPA軸の反応性が低下し、コルチゾールの分泌が減少している可能性があります。これはストレスに対する身体の防御反応が枯渇した状態です。回復力そのものが弱まっているため、まず「できたこと」を認識する練習から始めることが大切です。',
  },
  balanced: {
    name: 'バランス型',
    nameEn: 'Balanced',
    emoji: '🌿',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    gradientFrom: '#059669',
    gradientTo: '#10b981',
    summary: '特定のタイプへの偏りはありません。バランスが取れている状態です。',
    body: 'バランス型は、3つの燃え尽きパターンのいずれにも強く偏っていない状態です。ただし、総合スコアが高い場合は、特定のパターンではなく複合的なストレスが蓄積している可能性があります。定期的にセルフチェックを行い、変化に気づくことが大切です。',
    mechanism: 'バランス型の方は、特定のストレス反応パターンに偏っていない状態です。ただし、総合スコアが高い場合は、慢性的なストレスが複合的に蓄積している可能性があります。睡眠・運動・社会的つながりの3つのバランスを意識することをおすすめします。',
  },
}

export const SEVERITY_INFO: Record<Severity, { label: string; emoji: string; color: string; message: string }> = {
  low: {
    label: '低い',
    emoji: '🟢',
    color: 'text-emerald-600',
    message: '現時点では燃え尽きの傾向は低い水準です。このバランスを維持していきましょう。',
  },
  moderate: {
    label: '中程度',
    emoji: '🟡',
    color: 'text-amber-600',
    message: '注意が必要な水準です。早めにセルフケアの習慣を取り入れることをおすすめします。',
  },
  high: {
    label: '高い',
    emoji: '🟠',
    color: 'text-orange-600',
    message: '高い水準です。早めの対処が回復を早めます。生活リズムの見直しから始めてみてください。',
  },
  very_high: {
    label: '非常に高い',
    emoji: '🔴',
    color: 'text-red-600',
    message: '非常に高い水準です。専門家への相談を強くおすすめします。',
  },
}
