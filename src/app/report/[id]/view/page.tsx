import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { TYPE_INFO } from '@/lib/type-descriptions'
import type { BurnoutType } from '@/lib/scoring'
import Link from 'next/link'
import { BookOpen, Calendar, CheckCircle, ArrowRight, Heart, Shield, ExternalLink } from 'lucide-react'
import React from 'react'

type Props = { params: Promise<{ id: string }> }

// インラインマークダウン（太字・リンク）をReactノードに変換
function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // **太字**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(remaining.slice(0, boldMatch.index))
      }
      parts.push(<strong key={key++} className="font-semibold text-gray-800">{boldMatch[1]}</strong>)
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length)
      continue
    }
    parts.push(remaining)
    break
  }

  return parts
}

// マークダウンを構造化されたReactコンポーネントに変換
function formatContent(text: string, typeColor: string) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0
  let chapterIndex = 0

  const chapterIcons = [Shield, Heart, Calendar, BookOpen, ArrowRight]
  const chapterColors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6']

  while (i < lines.length) {
    const line = lines[i]

    // # タイトル（非表示 — ヘッダーで表示済み）
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      i++
      continue
    }

    // --- 区切り線
    if (line.trim() === '---') {
      elements.push(<div key={i} className="my-6 border-t border-gray-100" />)
      i++
      continue
    }

    // ## 章見出し → カード形式で表示
    if (line.startsWith('## ')) {
      const title = line.replace('## ', '')
      const Icon = chapterIcons[chapterIndex % chapterIcons.length]
      const color = chapterColors[chapterIndex % chapterColors.length]
      chapterIndex++

      // 章の内容を次の ## まで収集
      const chapterLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('## ')) {
        chapterLines.push(lines[i])
        i++
      }

      elements.push(
        <section key={`ch-${chapterIndex}`} className="mb-6">
          {/* 章ヘッダー */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div>
              <p className="text-[10px] tracking-wider uppercase" style={{ color }}>CHAPTER {chapterIndex}</p>
              <h2 className="text-base font-bold text-gray-800">{title}</h2>
            </div>
          </div>
          {/* 章の内容 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
            {renderChapterContent(chapterLines, color)}
          </div>
        </section>
      )
      continue
    }

    // それ以外の行（章外のテキスト）
    if (line.trim()) {
      elements.push(<p key={i} className="text-sm text-gray-700 leading-relaxed mb-2">{parseInline(line)}</p>)
    } else {
      elements.push(<div key={i} className="h-2" />)
    }
    i++
  }

  return elements
}

// 章の中身をレンダリング
function renderChapterContent(lines: string[], accentColor: string) {
  const elements: React.ReactNode[] = []
  let i = 0
  let listBuffer: string[] = []

  const flushList = () => {
    if (listBuffer.length === 0) return
    elements.push(
      <div key={`list-${i}`} className="space-y-2 my-3">
        {listBuffer.map((item, j) => (
          <div key={j} className="flex items-start gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: accentColor }} />
            <p className="text-sm text-gray-700 leading-relaxed">{parseInline(item)}</p>
          </div>
        ))}
      </div>
    )
    listBuffer = []
  }

  while (i < lines.length) {
    const line = lines[i]

    // ### サブ見出し
    if (line.startsWith('### ')) {
      flushList()
      const subtitle = line.replace('### ', '')
      elements.push(
        <h3 key={i} className="text-sm font-bold text-gray-800 mt-5 mb-2 flex items-center gap-2">
          <div className="w-1 h-4 rounded-full" style={{ backgroundColor: accentColor }} />
          {subtitle}
        </h3>
      )
      i++
      continue
    }

    // #### サブサブ見出し
    if (line.startsWith('#### ')) {
      flushList()
      elements.push(
        <h4 key={i} className="text-sm font-semibold text-gray-700 mt-4 mb-1.5">{line.replace('#### ', '')}</h4>
      )
      i++
      continue
    }

    // 箇条書き（・ - * で始まる行）
    if (/^[\s]*[・\-\*]\s/.test(line)) {
      const content = line.replace(/^[\s]*[・\-\*]\s*/, '')
      listBuffer.push(content)
      i++
      continue
    }

    // 番号付きリスト（1. 2. で始まる行）
    if (/^[\s]*\d+[\.\)]\s/.test(line)) {
      flushList()
      const content = line.replace(/^[\s]*\d+[\.\)]\s*/, '')
      const num = line.match(/(\d+)/)?.[1] ?? ''
      elements.push(
        <div key={i} className="flex items-start gap-3 my-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${accentColor}15` }}>
            <span className="text-[10px] font-bold" style={{ color: accentColor }}>{num}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{parseInline(content)}</p>
        </div>
      )
      i++
      continue
    }

    // 引用ブロック（> で始まる行）→ ハイライトボックス
    if (line.startsWith('> ')) {
      flushList()
      const quote = line.replace(/^>\s*/, '')
      elements.push(
        <div key={i} className="my-4 p-4 rounded-xl border-l-3" style={{ backgroundColor: `${accentColor}08`, borderLeftColor: accentColor }}>
          <p className="text-sm text-gray-700 leading-relaxed italic">{parseInline(quote)}</p>
        </div>
      )
      i++
      continue
    }

    // 空行
    if (line.trim() === '') {
      flushList()
      elements.push(<div key={i} className="h-2" />)
      i++
      continue
    }

    // 通常のテキスト — 「重要なメッセージ」を含む行はハイライト
    flushList()
    if (line.includes('これは性格の問題ではなく') || line.includes('性格ではなく') || line.includes('身体の反応です')) {
      elements.push(
        <div key={i} className="my-4 p-4 rounded-xl bg-amber-50 border border-amber-100">
          <div className="flex items-start gap-2">
            <Heart className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 leading-relaxed font-medium">{parseInline(line)}</p>
          </div>
        </div>
      )
    } else {
      elements.push(<p key={i} className="text-sm text-gray-700 leading-relaxed mb-2">{parseInline(line)}</p>)
    }
    i++
  }

  flushList()
  return elements
}

export default async function ReportViewPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  // check_result_idでレポートを検索
  const { data: report } = await supabase
    .from('paid_reports')
    .select('*, check_results(*)')
    .eq('check_result_id', id)
    .eq('status', 'generated')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!report || !report.report_content) {
    const { data: pending } = await supabase
      .from('paid_reports')
      .select('status')
      .eq('check_result_id', id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (pending?.status === 'pending') {
      return (
        <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center p-4">
          <div className="text-center max-w-xs">
            <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <p className="text-base font-medium text-gray-800 mb-2">レポートを生成しています</p>
            <p className="text-xs text-gray-500">通常1〜2分で完了します。このページを開いたままお待ちください。</p>
            <p className="text-xs text-gray-400 mt-4">自動で更新されない場合はページを再読み込みしてください。</p>
          </div>
        </div>
      )
    }

    notFound()
  }

  const result = report.check_results
  const primaryType = (result?.primary_type ?? 'devotee') as BurnoutType
  const type = TYPE_INFO[primaryType]
  const totalScore = result?.total_score ?? 0
  const personalScore = result?.personal_score ?? 0
  const workScore = result?.work_score ?? 0
  const interpersonalScore = result?.interpersonal_score ?? 0

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      {/* ヘッダー */}
      <div className="py-6 px-4 border-b border-gray-100 bg-white">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 tracking-wider">YOUR RECOVERY REPORT</p>
            <h1 className="text-base font-bold text-gray-800">あなた専用の回復レポート</h1>
          </div>
          <div className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${type.gradientFrom}15`, color: type.gradientFrom }}>
            {type.name}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* スコアサマリーカード */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-6">
          <p className="text-[10px] text-gray-400 tracking-wider mb-3">SCORE SUMMARY</p>

          {/* 総合スコア */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="#f3f4f6" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke={type.gradientFrom} strokeWidth="3"
                  strokeDasharray={`${totalScore}, 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-800">{totalScore}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">総合スコア {totalScore}/100</p>
              <p className="text-xs text-gray-500 mt-0.5">{type.catchphrase.split('、')[0]}</p>
            </div>
          </div>

          {/* 3つの下位スコア */}
          <div className="space-y-3">
            {[
              { label: '個人的バーンアウト', score: personalScore, color: '#f97316' },
              { label: '仕事関連バーンアウト', score: workScore, color: '#3b82f6' },
              { label: '対人関連バーンアウト', score: interpersonalScore, color: '#8b5cf6' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">{item.label}</span>
                  <span className="text-xs font-bold text-gray-800">{item.score}/100</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${item.score}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* レポート本文 */}
        {formatContent(report.report_content, type.gradientFrom)}

        {/* ===== ロードマップ セクション ===== */}
        <section className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] text-emerald-600 tracking-wider">30-DAY ROADMAP</p>
              <h2 className="text-base font-bold text-gray-800">ここから変わるための30日間</h2>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              レポートで見えた「仕組み」を変えるには、知識だけでは足りません。小さな行動を積み重ねて、身体のパターンを書き換える必要があります。
            </p>

            <div className="space-y-4 mb-5">
              {[
                { week: 'Week 1', theme: '応急処置', desc: '今の身体のアラームを止める。最優先プロトコルを1つだけ始める。', badge: '今ここ', badgeColor: 'bg-emerald-500' },
                { week: 'Week 2', theme: '土台づくり', desc: '睡眠・自律神経のリズムを整える。回復できる身体を作る。', badge: '', badgeColor: '' },
                { week: 'Week 3', theme: 'パターン書き換え', desc: 'タイプ特有の信念と行動パターンに介入する。ここが核心。', badge: '', badgeColor: '' },
                { week: 'Week 4', theme: '定着と再発防止', desc: '変化を習慣にする。再発トリガーを特定し、if-thenプランを作る。', badge: '', badgeColor: '' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {i + 1}
                    </div>
                    {i < 3 && <div className="w-0.5 h-6 bg-gray-100 my-1" />}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-gray-800">{item.week}: {item.theme}</p>
                      {item.badge && <span className={`text-[9px] text-white px-2 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-amber-800 mb-1">ただし、一人で全部やるのは難しい</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    ロードマップは「地図」です。でも、地図を見ながら一人で歩き続けるのは、疲れている時ほど難しい。途中で調整が必要な部分もあります。だから、一緒に歩く存在が必要です。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== みどりチャットモック セクション ===== */}
        <section className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <span className="text-lg">🌿</span>
            </div>
            <div>
              <p className="text-[10px] text-emerald-600 tracking-wider">RECOVERY COMPANION</p>
              <h2 className="text-base font-bold text-gray-800">みどりが、毎日寄り添います</h2>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* チャットモックアップ */}
            <div className="bg-gray-50 p-4 space-y-3">
              {/* みどりの挨拶 */}
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-sm">🌿</div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed">レポートを読ませていただきました。{type.name}タイプですね。今週のテーマは「応急処置」です。まずは1つだけ、小さなことから始めてみましょう。</p>
                </div>
              </div>

              {/* ユーザー */}
              <div className="flex justify-end">
                <div className="bg-emerald-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm leading-relaxed">何から始めればいいですか？</p>
                </div>
              </div>

              {/* みどりの回答 */}
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-sm">🌿</div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed">今日は1つだけ。寝る前にスマホを別の部屋に置いてみてください。それだけで大丈夫です。難しければ、スキップしても全然OKですよ。</p>
                </div>
              </div>

              {/* ユーザー */}
              <div className="flex justify-end">
                <div className="bg-emerald-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm leading-relaxed">それならできそう…</p>
                </div>
              </div>

              {/* みどり */}
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-sm">🌿</div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed">「できそう」って思えたこと、すごく大事です。明日また聞かせてくださいね。ここにいますから。</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-5 sm:p-6 border-t border-gray-100">
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                <span className="font-bold">みどり</span>は、あなたのタイプに合わせた回復プログラムを毎日ガイドするAIコーチです。
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                レポートの内容を理解した上で、あなたのペースに合わせて週ごとのテーマとマイクロタスクを提案します。調子が悪い日はペースを落とし、良い日は次のステップを提案します。
              </p>

              <div className="space-y-2 mb-5">
                {[
                  'レポートの内容を理解した上での伴走',
                  '毎日1つだけ、小さなマイクロタスク',
                  '調子に合わせてペースを自動調整',
                  '7日間無料で体験できます',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs text-gray-600">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://hitone.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-full transition-colors shadow-lg shadow-emerald-200/50"
              >
                みどりと7日間無料で始める
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <p className="text-[10px] text-gray-400 text-center mt-2">クレジットカード不要・いつでもやめられます</p>
            </div>
          </div>
        </section>

        {/* フッター */}
        <div className="text-center space-y-4 pb-8">
          <Link href={`/result/${id}`} className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 underline">
            結果ページに戻る
          </Link>
          <p className="text-[10px] text-gray-400 leading-relaxed max-w-sm mx-auto">
            ※本レポートは医学的診断ではありません。つらい状況が続いている場合は、心療内科等の専門機関へご相談ください。
          </p>
        </div>
      </div>
    </div>
  )
}
