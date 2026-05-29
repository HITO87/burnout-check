import type { BurnoutType, Severity } from './scoring'

export interface TypeInfo {
  name: string
  catchphrase: string
  hiddenStrength: string
  pattern: string
  color: string
  bgColor: string
  gradientFrom: string
  gradientTo: string
  summary: string
  body: string
  mechanism: string
}

export const TYPE_INFO: Record<BurnoutType, TypeInfo> = {
  devotee: {
    name: '背負いすぎる献身家',
    catchphrase: 'あなたが燃え尽きやすいのは、"責任感と献身力"を使いすぎているからかもしれません',
    hiddenStrength: '責任感と献身力',
    pattern: '人のために尽くしすぎて消耗',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    gradientFrom: '#ea580c',
    gradientTo: '#d97706',
    summary: '「自分がやらなきゃ」と抱え込み、休むことに罪悪感を感じる。誰かのために走り続けて、気づいた時には限界を超えている。',
    body: '献身家タイプは、責任感の強さゆえに燃え尽きます。仕事にのめり込み、私生活を犠牲にしてでも期待に応えようとします。休憩を取ることすら「サボっている」と感じてしまい、身体のSOSを無視し続けます。その献身力こそがあなたの強みですが、使いすぎると自分を壊してしまいます。',
    mechanism: 'このタイプの方は、コルチゾール（ストレスホルモン）が高い状態が続き、交感神経が優位になりやすい傾向があります。回復には"止まる仕組み"を意図的に作ることが重要です。',
  },
  perfectionist: {
    name: '求めすぎる職人気質',
    catchphrase: 'あなたが燃え尽きやすいのは、"妥協しない品質意識"を使いすぎているからかもしれません',
    hiddenStrength: '妥協しない品質意識',
    pattern: '100点じゃないと許せず疲弊',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    gradientFrom: '#1e3a5f',
    gradientTo: '#3b82f6',
    summary: '「これでは足りない」「もっと良くできるはず」。完璧を目指して走り続け、達成しても満足できない。',
    body: '職人気質タイプは、高い基準を持つがゆえに燃え尽きます。成果への執着が強く、80点の仕上がりでも「まだ足りない」と感じます。キャパシティを超えても仕事を引き受け、自分の限界を認められません。その品質意識は素晴らしい強みですが、自分にも同じ完璧さを求めると消耗します。',
    mechanism: 'このタイプの方は、コルチゾール（ストレスホルモン）が高い状態が続き、交感神経が優位になりやすい傾向があります。回復には"止まる仕組み"を意図的に作ることが重要です。',
  },
  empath: {
    name: '溜め込みすぎる共感者',
    catchphrase: 'あなたが燃え尽きやすいのは、"深い共感力と観察力"を使いすぎているからかもしれません',
    hiddenStrength: '深い共感力と観察力',
    pattern: '感情を出せず内側から崩れる',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    gradientFrom: '#0d9488',
    gradientTo: '#0891b2',
    summary: '周囲の感情を受け取りすぎて、自分の感情を置き去りにしてしまう。「自分さえ我慢すれば」が口癖になっている。',
    body: '共感者タイプは、他者の感情に敏感すぎるがゆえに燃え尽きます。仕事の結果をコントロールできない感覚や、何をしても状況が変わらないという無力感が積み重なります。感情を内側に溜め込み、表に出せないまま消耗していきます。その共感力は貴重な才能ですが、自分の感情も同じように大切にする必要があります。',
    mechanism: 'このタイプの方は、HPA軸の反応性が低下し、回復に必要なエネルギー自体が枯渇している可能性があります。回復には"まず休むこと"を最優先にすることが重要です。',
  },
  executor: {
    name: '抱え込みすぎる実行者',
    catchphrase: 'あなたが燃え尽きやすいのは、"自立心と実行力"を使いすぎているからかもしれません',
    hiddenStrength: '自立心と実行力',
    pattern: '一人で全部やって限界に達する',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    gradientFrom: '#374151',
    gradientTo: '#6b7280',
    summary: '頼られるのが当たり前になり、助けを求められない。努力に見合った評価が得られず、「何のためにやっているのか」わからなくなる。',
    body: '実行者タイプは、自立心の強さゆえに燃え尽きます。努力に見合った評価や報酬を得られていない感覚が蓄積し、困難に直面すると努力そのものを放棄するようになります。「自分がやるしかない」と抱え込み、助けを求めることができません。その実行力は大きな強みですが、一人で背負いすぎると壊れます。',
    mechanism: 'このタイプの方は、HPA軸の反応性が低下し、回復に必要なエネルギー自体が枯渇している可能性があります。回復には"まず休むこと"を最優先にすることが重要です。',
  },
  harmonizer: {
    name: '合わせすぎる調和者',
    catchphrase: 'あなたが燃え尽きやすいのは、"場を読む適応力"を使いすぎているからかもしれません',
    hiddenStrength: '場を読む適応力',
    pattern: '周囲に合わせて自分を見失う',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    gradientFrom: '#7c3aed',
    gradientTo: '#a855f7',
    summary: '相手の気持ちを優先して、自分の本音を飲み込んでしまう。「いい人」でいることに疲れている。',
    body: '調和者タイプは、周囲との関係を大切にしすぎるがゆえに燃え尽きます。他者の感情を常に監視し、場の空気を読み、自分を合わせ続けることで慢性的に疲弊します。「自分はどう感じているか」がわからなくなり、自分を見失います。その適応力は素晴らしい才能ですが、自分の感情にも耳を傾ける必要があります。',
    mechanism: 'このタイプの方は、常に他者の感情を監視する状態が続き、自律神経が慢性的に緊張しています。回復には"自分の感情に名前をつける"習慣が重要です。',
  },
  seeker: {
    name: '考えすぎる探究者',
    catchphrase: 'あなたが燃え尽きやすいのは、"知的好奇心と成長欲求"を使いすぎているからかもしれません',
    hiddenStrength: '知的好奇心と成長欲求',
    pattern: '刺激がなく意味を見失って枯れる',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    gradientFrom: '#065f46',
    gradientTo: '#10b981',
    summary: '成長の実感がない。能力が活かされていない。「このままでいいのか」という焦りが消えない。',
    body: '探究者タイプは、知的好奇心を満たせないがゆえに燃え尽きます。仕事に刺激や変化がなく、能力が活かされていない感覚が続きます。表面上は問題なく見えても、内面では「このままでいいのか」という焦燥感が蓄積しています。その成長欲求は大きな強みですが、今の環境では発揮する場がないことが苦しみの原因です。',
    mechanism: 'このタイプの方は、ドーパミン報酬系が鈍化し、何をしても達成感を感じにくくなっている可能性があります。回復には"小さな新しい刺激"を日常に取り入れることが重要です。',
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
