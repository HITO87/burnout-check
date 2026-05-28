import type { BurnoutType } from '@/lib/scoring'
import { Brain, Zap, Moon, Heart, Battery, CloudOff, AlertTriangle, ArrowDown, ArrowRight, CheckCircle, Target, RefreshCw, Shield } from 'lucide-react'

// =====================================================
// セクション1: ストレス司令系統（HPA軸カスケード）
// =====================================================

function HPAAxis({ type }: { type: BurnoutType }) {
  const stages = [
    { role: 'ストレス司令官', organ: '視床下部', action: '「危険だ！」と判断', icon: Brain, color: '#f59e0b' },
    { role: '伝令役', organ: '下垂体', action: '「出動せよ！」と命令を送る', icon: Zap, color: '#f97316' },
    { role: '実働部隊', organ: '副腎', action: 'コルチゾール（ストレスホルモン）を放出', icon: Shield, color: '#ef4444' },
  ]

  const typeStatus: Record<BurnoutType, { status: string; color: string }> = {
    frenetic: { status: '司令官が「もう安全だよ」の報告を無視して、命令を出し続けている状態です。', color: '#f97316' },
    underchallenged: { status: '司令官への刺激が少なすぎて、システム全体がスリープモードに入っています。', color: '#3b82f6' },
    wornout: { status: '実働部隊が疲弊し、命令を受けても出動できなくなっています。', color: '#7c3aed' },
    balanced: { status: '司令系統は概ね正常に機能しています。', color: '#10b981' },
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      <div className="p-5 border-b border-gray-50">
        <p className="text-xs text-gray-400 tracking-wider mb-1">STRESS COMMAND SYSTEM</p>
        <h3 className="text-base font-bold text-gray-800">あなたのストレス司令系統</h3>
        <p className="text-xs text-gray-500 mt-1">身体がストレスに反応する仕組みは、3つの司令ラインで動いています。</p>
      </div>
      <div className="p-5">
        <div className="space-y-0">
          {stages.map((s, i) => {
            const Icon = s.icon
            const isLast = i === stages.length - 1
            return (
              <div key={i}>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}12` }}>
                      <Icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    {!isLast && <div className="w-0.5 h-6 my-1 rounded-full" style={{ backgroundColor: `${s.color}20` }} />}
                  </div>
                  <div className={`flex-1 ${isLast ? '' : 'pb-2'}`}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-gray-800">{s.role}</span>
                      <span className="text-[10px] text-gray-400">（{s.organ}）</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{s.action}</p>
                  </div>
                </div>
                {!isLast && (
                  <div className="flex justify-center -my-1">
                    <ArrowDown className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* あなたの状態 */}
        <div className="mt-5 p-4 rounded-xl" style={{ backgroundColor: `${typeStatus[type].color}08`, borderLeft: `3px solid ${typeStatus[type].color}` }}>
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: typeStatus[type].color }} />
            <div>
              <p className="text-xs font-medium text-gray-800 mb-1">あなたの場合</p>
              <p className="text-xs text-gray-600 leading-relaxed">{typeStatus[type].status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// =====================================================
// セクション1b: 自律神経ラダー（Deb Dana式）
// =====================================================

function NervousSystemLadder({ type }: { type: BurnoutType }) {
  const levels = [
    {
      level: '安全モード',
      system: '腹側迷走神経',
      state: '心拍安定・集中できる・人とつながれる',
      color: '#10b981',
      bgColor: '#ecfdf5',
    },
    {
      level: '戦闘モード',
      system: '交感神経',
      state: '心拍上昇・過覚醒・攻撃 or 回避',
      color: '#f97316',
      bgColor: '#fff7ed',
    },
    {
      level: '凍結モード',
      system: '背側迷走神経',
      state: 'エネルギー枯渇・無気力・引きこもり',
      color: '#6b7280',
      bgColor: '#f9fafb',
    },
  ]

  const youAreHere: Record<BurnoutType, number> = {
    frenetic: 1,
    underchallenged: 2,
    wornout: 2,
    balanced: 0,
  }

  const currentLevel = youAreHere[type]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      <div className="p-5 border-b border-gray-50">
        <p className="text-xs text-gray-400 tracking-wider mb-1">NERVOUS SYSTEM LADDER</p>
        <h3 className="text-base font-bold text-gray-800">自律神経の「はしご」</h3>
        <p className="text-xs text-gray-500 mt-1">あなたの神経系は、3つのモードを行き来しています。今、どこにいるかを見てみましょう。</p>
      </div>
      <div className="p-5 space-y-3">
        {levels.map((l, i) => {
          const isCurrent = i === currentLevel
          return (
            <div key={i} className={`relative rounded-xl p-4 border-2 transition-all ${isCurrent ? 'shadow-md' : 'opacity-60'}`}
              style={{
                backgroundColor: isCurrent ? l.bgColor : '#fafafa',
                borderColor: isCurrent ? l.color : 'transparent',
              }}>
              {isCurrent && (
                <div className="absolute -right-1 -top-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: l.color }}>
                  あなたは今ここ
                </div>
              )}
              <div className="flex items-center gap-3 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-sm font-bold text-gray-800">{l.level}</span>
                <span className="text-[10px] text-gray-400">（{l.system}）</span>
              </div>
              <p className="text-xs text-gray-600 ml-6">{l.state}</p>
            </div>
          )
        })}
        <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
          回復とは、このはしごを1段ずつ「安全モード」に向かって登ることです。一気に登る必要はありません。
        </p>
      </div>
    </div>
  )
}

// =====================================================
// セクション1c: コルチゾール日内リズム対比
// =====================================================

function CortisolRhythm({ type }: { type: BurnoutType }) {
  const normalBars = [90, 80, 65, 50, 35, 20]
  const abnormalBars: Record<BurnoutType, number[]> = {
    frenetic: [95, 92, 88, 40, 25, 15],    // 朝から暴騰→午後クラッシュ
    underchallenged: [30, 35, 30, 28, 25, 20], // 終日低空飛行
    wornout: [25, 20, 18, 15, 12, 10],      // 全体的に枯渇
    balanced: [85, 75, 60, 45, 30, 18],     // ほぼ正常
  }
  const timeLabels = ['朝', '', '昼', '', '夕', '夜']

  const typeDesc: Record<BurnoutType, string> = {
    frenetic: '朝から午前中にかけてコルチゾールが異常に高く、午後に急落する「暴騰→クラッシュ」パターンです。午後の強い眠気や集中力の途切れはこれが原因です。',
    underchallenged: '1日を通してコルチゾールが低い状態が続いています。「やる気スイッチが入らない」感覚の正体です。',
    wornout: 'コルチゾールの分泌能力自体が枯渇しています。朝のピークすら十分に出ないため、「起きた瞬間から疲れている」状態です。',
    balanced: 'コルチゾールのリズムは概ね正常に近い状態です。',
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      <div className="p-5 border-b border-gray-50">
        <p className="text-xs text-gray-400 tracking-wider mb-1">CORTISOL RHYTHM</p>
        <h3 className="text-base font-bold text-gray-800">コルチゾールの1日のリズム</h3>
        <p className="text-xs text-gray-500 mt-1">ストレスホルモン（コルチゾール）は、本来「朝高く→夜低い」のが正常です。</p>
      </div>
      <div className="p-5">
        {/* 正常パターン */}
        <p className="text-xs font-medium text-gray-600 mb-2">正常なパターン</p>
        <div className="flex items-end gap-1.5 h-16 mb-1">
          {normalBars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="w-full rounded-t-sm bg-emerald-300" style={{ height: `${h}%` }} />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5 mb-5">
          {timeLabels.map((t, i) => (
            <div key={i} className="flex-1 text-center text-[10px] text-gray-400">{t}</div>
          ))}
        </div>

        {/* あなたのパターン */}
        <p className="text-xs font-medium text-gray-600 mb-2">あなたのパターン（推定）</p>
        <div className="flex items-end gap-1.5 h-16 mb-1">
          {abnormalBars[type].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="w-full rounded-t-sm" style={{ height: `${h}%`, backgroundColor: h > 80 ? '#ef4444' : h > 50 ? '#f97316' : h > 30 ? '#eab308' : '#9ca3af' }} />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5 mb-4">
          {timeLabels.map((t, i) => (
            <div key={i} className="flex-1 text-center text-[10px] text-gray-400">{t}</div>
          ))}
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">{typeDesc[type]}</p>
      </div>
    </div>
  )
}

// =====================================================
// セクション2: だからここを変える必要がある（課題構造化）
// =====================================================

interface Issue {
  icon: React.ElementType
  title: string
  broken: string
  why: string
  fix: string
}

const TYPE_ISSUES: Record<BurnoutType, { headline: string; subtext: string; stressCycle: string; issues: Issue[] }> = {
  frenetic: {
    headline: '熱狂型の「壊れている仕組み」',
    subtext: '頑張ること自体は悪くない。でも、ブレーキが壊れた車は最終的にクラッシュします。',
    stressCycle: 'あなたの身体はストレス反応を「完了」できていません。ストレスの原因（仕事）が解決しても、身体の中のストレス反応はまだ続いています。休んでも回復しない理由はここにあります。',
    issues: [
      {
        icon: RefreshCw,
        title: 'ブレーキの故障',
        broken: '「止まる」仕組みが壊れている',
        why: 'コルチゾールが「もう十分だよ」というフィードバック信号を無視しています。結果、身体が常にアクセル全開の状態です。',
        fix: '意志の力で止まるのは不可能です。「止まる仕組み」を環境に組み込む必要があります。例：スマホのスクリーンタイム制限、仕事用PCの自動シャットダウン、カレンダーに「何もしない時間」をブロック。',
      },
      {
        icon: Moon,
        title: '睡眠の質の低下',
        broken: '深い睡眠（ノンレム睡眠）が減少している',
        why: '交感神経が優位なまま就寝するため、身体は眠っていても脳は「戦闘準備中」です。',
        fix: '就寝90分前からの「シャットダウンルーティン」が有効です。具体的には：部屋の照明を暖色にする → スマホを別室に置く → 10分間の深呼吸 or ストレッチ。',
      },
      {
        icon: Heart,
        title: 'ストレスサイクルの未完了',
        broken: 'ストレスの原因が消えても、身体のストレス反応が終わっていない',
        why: '仕事が終わっても、身体はまだ「危険な状態」だと思っています。これが「休んでも回復しない」感覚の正体です。',
        fix: 'ストレスサイクルを「身体で」完了させる必要があります。最も効果的なのは20分以上の有酸素運動、6秒の深呼吸（吸う4秒→吐く6秒）、20秒のハグです。',
      },
    ],
  },
  underchallenged: {
    headline: '退屈型の「壊れている仕組み」',
    subtext: '何もしていないのに疲れる。それは怠けではなく、脳の報酬系が反応しなくなっているサインです。',
    stressCycle: '退屈型のストレスは「何もない」ことから生まれます。刺激がなさすぎると、脳は「この環境には価値がない」と判断し、動機づけのシステムをシャットダウンします。これが「やる気が出ない」の正体です。',
    issues: [
      {
        icon: Battery,
        title: '報酬系の鈍化',
        broken: '達成感を感じるセンサーが鈍くなっている',
        why: '同じ刺激の繰り返しにより、ドーパミン（やる気ホルモン）の受容体が反応しにくくなっています。ゲームの「飽き」と同じ仕組みです。',
        fix: '「小さな新しいこと」を毎日1つ取り入れてください。通勤ルートを変える、知らない音楽を聴く、食べたことのないものを食べる。新規性がドーパミン系を再起動させます。',
      },
      {
        icon: Target,
        title: '自己効力感の消失',
        broken: '「自分にはできる」という感覚が失われている',
        why: '能力を発揮する機会がないため、「自分は何ができるか」がわからなくなっています。',
        fix: '「熟達体験」を意図的に作ります。仕事の外で、少し難しい課題に取り組むことが有効です。料理、楽器、プログラミング、言語学習など、「少しずつ上達する実感」が得られるものを選んでください。',
      },
      {
        icon: Heart,
        title: '意味の喪失',
        broken: '「何のために」が見えなくなっている',
        why: '日々の作業と自分の価値観がつながっていないため、全てが「作業」に感じられます。',
        fix: '週に1回、15分だけ「自分の価値観リスト」を見直してください。紙に「今の仕事で、自分の価値観と一致している部分はどこか？」と書き出すだけでOKです。',
      },
    ],
  },
  wornout: {
    headline: '消耗型の「壊れている仕組み」',
    subtext: '頑張れないのは弱いからではない。身体のバッテリーが本当に枯渇しているからです。',
    stressCycle: '消耗型は、長期間にわたって努力が報われない経験が積み重なった結果です。身体が「頑張っても無駄だ」と学習してしまい（学習性無力感）、ストレス応答系そのものが機能低下しています。',
    issues: [
      {
        icon: CloudOff,
        title: 'HPA軸の疲弊',
        broken: 'ストレス応答システム自体が枯渇している',
        why: '長期的なストレスにより、副腎がコルチゾールを十分に作れなくなっています。「朝起きた瞬間から疲れている」のはこのためです。',
        fix: '回復の第一歩は「何かをする」ことではなく「できたことを認める」ことです。毎晩寝る前に「今日できたこと」を3つ書き出してください。どんな小さなことでも構いません。',
      },
      {
        icon: Shield,
        title: 'コントロール感の喪失',
        broken: '「自分で選んでいる」感覚がない',
        why: '何をしても状況が変わらない経験が重なり、「選んでも意味がない」と身体が学習しています。',
        fix: '1日1回、「自分で選ぶ」練習をします。何を食べるか、どの道を歩くか、何時に寝るか。小さなことでいいので「自分で決めた」という感覚を取り戻してください。',
      },
      {
        icon: Heart,
        title: '感情の麻痺',
        broken: '感じることを身体が拒否している',
        why: 'これ以上傷つかないための防御反応です。感情を感じないようにすることで、身体は自分を守ろうとしています。',
        fix: '感情を「考える」のではなく「身体で感じる」練習から始めます。1日1回、手を胸に当てて「今、身体はどんな感覚がある？」と聞いてみてください。温かい、冷たい、重い、軽い。言葉にならなくてOKです。',
      },
    ],
  },
  balanced: {
    headline: '現在の課題ポイント',
    subtext: '特定のパターンへの偏りは少ないですが、以下の点に気を配ることで予防につながります。',
    stressCycle: 'バランス型でも、日常的にストレスサイクルを完了させる習慣を持つことが、燃え尽きの予防になります。',
    issues: [
      {
        icon: RefreshCw,
        title: 'ストレスの蓄積予防',
        broken: '小さなストレスが気づかないうちに溜まる',
        why: '目立った不調がないため、ストレスの蓄積に気づきにくい状態です。',
        fix: '週1回、10分間の「ストレス棚卸し」を行ってください。今週感じたストレスを書き出し、それぞれについてストレスサイクルが完了しているかチェックします。',
      },
      {
        icon: Moon,
        title: '睡眠の質の維持',
        broken: '睡眠の質が下がり始めると連鎖的に悪化する',
        why: '睡眠はストレス耐性の基盤です。ここが崩れると他の全てに影響します。',
        fix: '就寝・起床時刻を固定してください。週末も±30分以内に。これだけで睡眠の質は大きく変わります。',
      },
      {
        icon: Heart,
        title: '社会的つながり',
        broken: '孤立が燃え尽きの最大リスク因子',
        why: '人とのつながりは、自律神経を「安全モード」に戻す最も強力な方法です。',
        fix: '週2回以上、対面で誰かと会話する時間を確保してください。5分の雑談でもOKです。',
      },
    ],
  },
}

function IssueAnalysis({ type }: { type: BurnoutType }) {
  const data = TYPE_ISSUES[type]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      <div className="p-5 border-b border-gray-50">
        <p className="text-xs text-gray-400 tracking-wider mb-1">WHAT NEEDS TO CHANGE</p>
        <h3 className="text-base font-bold text-gray-800">{data.headline}</h3>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{data.subtext}</p>
      </div>

      {/* ストレスサイクルの解説 */}
      <div className="px-5 pt-5">
        <div className="bg-amber-50 rounded-xl p-4 mb-5 border border-amber-100">
          <div className="flex items-start gap-2">
            <RefreshCw className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-amber-800 mb-1">なぜ「休んでも回復しない」のか</p>
              <p className="text-xs text-amber-700 leading-relaxed">{data.stressCycle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3つの課題 */}
      <div className="px-5 pb-5 space-y-5">
        {data.issues.map((issue, i) => {
          const Icon = issue.icon
          return (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              {/* 課題ヘッダー */}
              <div className="bg-gray-50 px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <Icon className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{issue.title}</p>
                  <p className="text-[10px] text-gray-400">{issue.broken}</p>
                </div>
              </div>
              {/* なぜ → どうする */}
              <div className="p-4 space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-3 h-3 text-orange-500" />
                    <p className="text-[10px] font-medium text-orange-600 tracking-wider">なぜこうなっているか</p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{issue.why}</p>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowDown className="w-3 h-3 text-gray-300" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <p className="text-[10px] font-medium text-emerald-600 tracking-wider">具体的な改善方法</p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{issue.fix}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="px-5 pb-5">
        <p className="text-[10px] text-gray-400 leading-relaxed">
          ※これは性格の問題ではなく、身体のストレス反応です。適切なケアによって改善が期待できます。つらい状況が続く場合は専門家にご相談ください。
        </p>
      </div>
    </div>
  )
}

// =====================================================
// メイン: 3セクション構成
// =====================================================

export default function BodyMechanism({ type }: { type: BurnoutType }) {
  return (
    <div className="mb-6">
      {/* セクション見出し */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 tracking-wider mb-1">DEEP ANALYSIS</p>
        <h2 className="text-lg font-bold text-gray-800">あなたの身体で起きていること</h2>
        <p className="text-xs text-gray-500 mt-1">科学的研究に基づいて、あなたの状態を構造的に解説します。</p>
      </div>

      {/* 1. ストレス司令系統 */}
      <HPAAxis type={type} />

      {/* 2. 自律神経ラダー */}
      <NervousSystemLadder type={type} />

      {/* 3. コルチゾール日内リズム */}
      <CortisolRhythm type={type} />

      {/* 4. 課題の構造化 + 改善方法 */}
      <IssueAnalysis type={type} />
    </div>
  )
}
