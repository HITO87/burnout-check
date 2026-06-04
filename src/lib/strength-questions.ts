import type { StrengthType } from './strength-types'

export interface StrengthQuestion {
  id: number
  text: string
  choices: {
    label: string
    scores: Partial<Record<StrengthType, number>>
  }[]
}

export const STRENGTH_QUESTIONS: StrengthQuestion[] = [
  // --- 仕事への向き合い方 ---
  {
    id: 1,
    text: '仕事で問題が起きたとき、最初にすることは？',
    choices: [
      { label: '困っている人がいないか確認する', scores: { devotee: 2, empath: 1 } },
      { label: '原因を分析して構造を整理する', scores: { analyst: 2, perfectionist: 1 } },
      { label: 'すぐに自分で手を動かして解決する', scores: { executor: 2, devotee: 1 } },
      { label: '「もっといい方法があるはず」と考え始める', scores: { creator: 2, seeker: 1 } },
    ],
  },
  {
    id: 2,
    text: '会議中、あなたが自然とやっていることは？',
    choices: [
      { label: '発言していない人の表情を見ている', scores: { empath: 2, harmonizer: 1 } },
      { label: '議論の論点を整理して「要するに」とまとめる', scores: { analyst: 2, executor: 1 } },
      { label: '全員が納得できる落としどころを探している', scores: { harmonizer: 2, devotee: 1 } },
      { label: '「この議論、そもそも前提が違うのでは」と考えている', scores: { creator: 2, analyst: 1 } },
    ],
  },
  {
    id: 3,
    text: '仕事の成果物に対して「まだ足りない」と感じたとき、どうする？',
    choices: [
      { label: '納得いくまで自分で直し続ける', scores: { perfectionist: 2, executor: 1 } },
      { label: 'データや事例を追加で調べて補強する', scores: { seeker: 2, analyst: 1 } },
      { label: '別のアプローチを試してみる', scores: { creator: 2, seeker: 1 } },
      { label: '周りの意見を聞いて調整する', scores: { harmonizer: 2, empath: 1 } },
    ],
  },
  // --- 人との関わり方 ---
  {
    id: 4,
    text: '友人から深刻な相談を受けたとき、あなたの反応は？',
    choices: [
      { label: '相手の気持ちが自分のことのように伝わってくる', scores: { empath: 2, devotee: 1 } },
      { label: '何ができるかを考えて、具体的に動こうとする', scores: { executor: 2, devotee: 1 } },
      { label: '問題の構造を整理して、選択肢を提示する', scores: { analyst: 2, seeker: 1 } },
      { label: 'まず相手が安心できる空気を作る', scores: { harmonizer: 2, empath: 1 } },
    ],
  },
  {
    id: 5,
    text: 'チームで意見が対立したとき、あなたはどうする？',
    choices: [
      { label: '両方の気持ちを汲んで、間に入る', scores: { harmonizer: 2, empath: 1 } },
      { label: '論理的にどちらが正しいか判断する', scores: { analyst: 2, perfectionist: 1 } },
      { label: '対立を活かして、第3の案を出す', scores: { creator: 2, harmonizer: 1 } },
      { label: '自分が引き受けて、とにかく前に進める', scores: { executor: 2, devotee: 1 } },
    ],
  },
  {
    id: 6,
    text: '人から「ありがとう」と言われて、一番嬉しいのは？',
    choices: [
      { label: '「あなたがいてくれて助かった」', scores: { devotee: 2, harmonizer: 1 } },
      { label: '「あなたの分析のおかげで決められた」', scores: { analyst: 2, perfectionist: 1 } },
      { label: '「あなたと話すと気持ちが楽になる」', scores: { empath: 2, harmonizer: 1 } },
      { label: '「あなたのアイデアが突破口になった」', scores: { creator: 2, seeker: 1 } },
    ],
  },
  // --- エネルギーの使い方 ---
  {
    id: 7,
    text: '休日、何をしているときに一番エネルギーが湧く？',
    choices: [
      { label: '新しい知識やスキルを学んでいるとき', scores: { seeker: 2, analyst: 1 } },
      { label: '誰かの役に立つことをしているとき', scores: { devotee: 2, empath: 1 } },
      { label: '作品やアイデアを形にしているとき', scores: { creator: 2, perfectionist: 1 } },
      { label: 'ToDoリストを片付けて前に進んでいるとき', scores: { executor: 2, perfectionist: 1 } },
    ],
  },
  {
    id: 8,
    text: '仕事で「もうやめたい」と思うのは、どんなとき？',
    choices: [
      { label: '成長の実感がなく、同じことの繰り返しのとき', scores: { seeker: 2, creator: 1 } },
      { label: '自分の努力が正当に評価されないとき', scores: { executor: 2, perfectionist: 1 } },
      { label: '周りの人の感情に振り回され続けるとき', scores: { empath: 2, harmonizer: 1 } },
      { label: '非効率なやり方を変えられないとき', scores: { analyst: 2, creator: 1 } },
    ],
  },
  // --- 自分との関わり方 ---
  {
    id: 9,
    text: '夜、ベッドに入ったとき頭の中で起きていることは？',
    choices: [
      { label: '今日、誰かを傷つけなかったか振り返っている', scores: { empath: 2, devotee: 1 } },
      { label: '明日やるべきことを整理している', scores: { executor: 2, analyst: 1 } },
      { label: '今日の出来事の意味を考えている', scores: { seeker: 2, empath: 1 } },
      { label: '新しいアイデアが次々浮かんで止まらない', scores: { creator: 2, seeker: 1 } },
    ],
  },
  {
    id: 10,
    text: '自分の弱点だと思っていることは？',
    choices: [
      { label: '断れない。頼まれると引き受けてしまう', scores: { devotee: 2, harmonizer: 1 } },
      { label: '完璧じゃないと出せない。締め切りギリギリになる', scores: { perfectionist: 2, analyst: 1 } },
      { label: '考えすぎて行動が遅れる', scores: { analyst: 2, seeker: 1 } },
      { label: '飽きっぽい。続けるのが苦手', scores: { creator: 2, seeker: 1 } },
    ],
  },
  // --- 価値観 ---
  {
    id: 11,
    text: '理想の自分に一番近いのは？',
    choices: [
      { label: '周りの人を笑顔にできる自分', scores: { devotee: 2, empath: 1 } },
      { label: '誰にも真似できない成果を出す自分', scores: { perfectionist: 2, executor: 1 } },
      { label: 'まだ誰も見つけていないことを発見する自分', scores: { seeker: 2, creator: 1 } },
      { label: 'どんな状況でも冷静に判断できる自分', scores: { analyst: 2, executor: 1 } },
    ],
  },
  {
    id: 12,
    text: '10年後の自分に期待することは？',
    choices: [
      { label: '信頼される人になっていたい', scores: { devotee: 2, harmonizer: 1 } },
      { label: '専門性を極めていたい', scores: { perfectionist: 2, seeker: 1 } },
      { label: '自分の力で何かを生み出していたい', scores: { creator: 2, executor: 1 } },
      { label: '物事の本質を見抜ける人になりたい', scores: { analyst: 2, seeker: 1 } },
    ],
  },
]

export interface StrengthResult {
  primary: StrengthType
  secondary: StrengthType
  scores: Record<StrengthType, number>
}

export function calculateStrengthResult(answers: Record<number, number>): StrengthResult {
  const scores: Record<StrengthType, number> = {
    devotee: 0, perfectionist: 0, empath: 0, executor: 0,
    harmonizer: 0, seeker: 0, analyst: 0, creator: 0,
  }

  for (const [qId, choiceIdx] of Object.entries(answers)) {
    const question = STRENGTH_QUESTIONS.find(q => q.id === Number(qId))
    if (!question) continue
    const choice = question.choices[choiceIdx]
    if (!choice) continue
    for (const [type, score] of Object.entries(choice.scores)) {
      scores[type as StrengthType] += score
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const primary = sorted[0][0] as StrengthType
  let secondary = sorted[1][0] as StrengthType
  // primary と secondary が同じにならないようにする（通常ありえないが念のため）
  if (secondary === primary) secondary = sorted[2][0] as StrengthType

  return { primary, secondary, scores }
}

export function encodeResult(result: StrengthResult): string {
  return btoa(JSON.stringify({ p: result.primary, s: result.secondary, sc: result.scores }))
}

export function decodeResult(encoded: string): StrengthResult | null {
  try {
    const data = JSON.parse(atob(encoded))
    return { primary: data.p, secondary: data.s, scores: data.sc }
  } catch {
    return null
  }
}
