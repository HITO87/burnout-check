export interface Question {
  id: number
  text: string
  section: 'personal' | 'work' | 'interpersonal' | 'frenetic' | 'underchallenged' | 'wornout'
  sectionLabel: string
}

export const QUESTIONS: Question[] = [
  // Section A-1: 個人的バーンアウト（CBI準拠・6問）
  { id: 1, text: '体力的に疲れ果てていると感じることがどのくらいありますか？', section: 'personal', sectionLabel: '心身の疲労' },
  { id: 2, text: '精神的に疲れ果てていると感じることがどのくらいありますか？', section: 'personal', sectionLabel: '心身の疲労' },
  { id: 3, text: '「もう限界だ」と感じることがどのくらいありますか？', section: 'personal', sectionLabel: '心身の疲労' },
  { id: 4, text: '心身ともに消耗していると感じることがどのくらいありますか？', section: 'personal', sectionLabel: '心身の疲労' },
  { id: 5, text: '「もうこれ以上は無理だ」と感じることがどのくらいありますか？', section: 'personal', sectionLabel: '心身の疲労' },
  { id: 6, text: '体が弱っている・壊れそうだと感じることがどのくらいありますか？', section: 'personal', sectionLabel: '心身の疲労' },

  // Section A-2: 仕事関連バーンアウト（CBI準拠・7問）
  { id: 7, text: '仕事が精神的に消耗すると感じることがどのくらいありますか？', section: 'work', sectionLabel: '仕事との関係' },
  { id: 8, text: '仕事に対して不満を感じることがどのくらいありますか？', section: 'work', sectionLabel: '仕事との関係' },
  { id: 9, text: '仕事のことを考えると疲れを感じることがどのくらいありますか？', section: 'work', sectionLabel: '仕事との関係' },
  { id: 10, text: '仕事中、1時間1時間が長く感じられることがどのくらいありますか？', section: 'work', sectionLabel: '仕事との関係' },
  { id: 11, text: '仕事に十分なエネルギーが残っていないと感じることがどのくらいありますか？', section: 'work', sectionLabel: '仕事との関係' },
  { id: 12, text: '仕事以外のことに費やす体力が残っていないと感じることがどのくらいありますか？', section: 'work', sectionLabel: '仕事との関係' },
  { id: 13, text: '朝起きた時、また1日仕事をしなければと思うと疲れを感じることがどのくらいありますか？', section: 'work', sectionLabel: '仕事との関係' },

  // Section A-3: 対人関連バーンアウト（CBI準拠・6問）
  { id: 14, text: '周囲の人と接することが疲れると感じることがどのくらいありますか？', section: 'interpersonal', sectionLabel: '人との関係' },
  { id: 15, text: '周囲の人と接していると精神的に消耗すると感じることがどのくらいありますか？', section: 'interpersonal', sectionLabel: '人との関係' },
  { id: 16, text: '周囲の人に対して「もう関わりたくない」と感じることがどのくらいありますか？', section: 'interpersonal', sectionLabel: '人との関係' },
  { id: 17, text: '周囲の人のために自分のエネルギーを使い果たしていると感じることがどのくらいありますか？', section: 'interpersonal', sectionLabel: '人との関係' },
  { id: 18, text: '周囲の人と接した後、疲労を感じることがどのくらいありますか？', section: 'interpersonal', sectionLabel: '人との関係' },
  { id: 19, text: '周囲の人の問題に対して、以前ほど共感できなくなったと感じることがどのくらいありますか？', section: 'interpersonal', sectionLabel: '人との関係' },

  // Section B-1: 熱狂型（BCSQ-12準拠・4問）
  { id: 20, text: '自分のキャパシティを超えて仕事を引き受けてしまう', section: 'frenetic', sectionLabel: 'あなたのタイプ' },
  { id: 21, text: '仕事で大きな成果を出すことに執着している', section: 'frenetic', sectionLabel: 'あなたのタイプ' },
  { id: 22, text: '仕事にのめり込みすぎて私生活が犠牲になっている', section: 'frenetic', sectionLabel: 'あなたのタイプ' },
  { id: 23, text: '休憩を取ることに罪悪感を感じる', section: 'frenetic', sectionLabel: 'あなたのタイプ' },

  // Section B-2: 退屈型（BCSQ-12準拠・4問）
  { id: 24, text: '仕事に刺激や変化がないと感じる', section: 'underchallenged', sectionLabel: 'あなたのタイプ' },
  { id: 25, text: '今の仕事では自分の能力が活かされていないと感じる', section: 'underchallenged', sectionLabel: 'あなたのタイプ' },
  { id: 26, text: '仕事を通じた成長の実感がない', section: 'underchallenged', sectionLabel: 'あなたのタイプ' },
  { id: 27, text: '仕事に対して退屈さや無関心を感じる', section: 'underchallenged', sectionLabel: 'あなたのタイプ' },

  // Section B-3: 消耗型（BCSQ-12準拠・4問）
  { id: 28, text: '努力に見合った評価や報酬を得られていないと感じる', section: 'wornout', sectionLabel: 'あなたのタイプ' },
  { id: 29, text: '困難に直面すると、努力をやめてしまうことがある', section: 'wornout', sectionLabel: 'あなたのタイプ' },
  { id: 30, text: '仕事の結果をコントロールできないと感じる', section: 'wornout', sectionLabel: 'あなたのタイプ' },
  { id: 31, text: '何をしても状況は変わらないと感じる', section: 'wornout', sectionLabel: 'あなたのタイプ' },
]

export const SCALE_LABELS = [
  { value: 1, label: 'まったくない' },
  { value: 2, label: 'ほとんどない' },
  { value: 3, label: 'たまにある' },
  { value: 4, label: '時々ある' },
  { value: 5, label: 'よくある' },
  { value: 6, label: 'かなり頻繁' },
  { value: 7, label: '常にある' },
]
