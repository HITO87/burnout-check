import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { TYPE_INFO } from '@/lib/type-descriptions'
import type { BurnoutType } from '@/lib/scoring'
import Link from 'next/link'

type Props = { params: Promise<{ id: string }> }

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
    // まだ生成中の場合
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
  const type = TYPE_INFO[(result?.primary_type ?? 'balanced') as BurnoutType]

  // マークダウンの見出し（##）をHTMLに変換
  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-lg font-bold text-gray-800 mt-8 mb-3 pb-2 border-b border-gray-100">{line.replace('## ', '')}</h2>
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-base font-bold text-gray-700 mt-5 mb-2">{line.replace('### ', '')}</h3>
      }
      if (line.trim() === '') return <div key={i} className="h-3" />
      return <p key={i} className="text-sm text-gray-700 leading-relaxed mb-2">{line}</p>
    })
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      {/* ヘッダー */}
      <div className="py-6 px-4 border-b border-gray-100 bg-white">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">YOUR RECOVERY REPORT</p>
            <h1 className="text-base font-bold text-gray-800">あなた専用の回復レポート</h1>
          </div>
          <div className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${type.gradientFrom}15`, color: type.gradientFrom }}>
            {type.name}
          </div>
        </div>
      </div>

      {/* レポート本文 */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {formatContent(report.report_content)}
        </div>

        {/* フッター */}
        <div className="mt-8 text-center space-y-4">
          <Link href={`/result/${id}`} className="text-xs text-gray-400 hover:text-emerald-600 underline">
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
