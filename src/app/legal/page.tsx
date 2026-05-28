import Link from 'next/link'

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-6 block">← トップに戻る</Link>
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <h1 className="text-xl font-bold text-gray-800">特定商取引法に基づく表記</h1>
          <p className="text-xs text-gray-400">最終更新: 2026年5月28日</p>

          <div className="text-sm text-gray-700 leading-relaxed space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs text-amber-700">有料レポート機能は現在準備中です。販売開始時に本ページを更新します。</p>
            </div>

            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                <tr><td className="py-2 font-medium text-gray-600 w-1/3">販売事業者</td><td className="py-2">HITONE</td></tr>
                <tr><td className="py-2 font-medium text-gray-600">所在地</td><td className="py-2">請求があった場合に遅滞なく開示します</td></tr>
                <tr><td className="py-2 font-medium text-gray-600">連絡先</td><td className="py-2">請求があった場合に遅滞なく開示します</td></tr>
                <tr><td className="py-2 font-medium text-gray-600">販売価格</td><td className="py-2">各商品ページに表示（税込）</td></tr>
                <tr><td className="py-2 font-medium text-gray-600">支払方法</td><td className="py-2">クレジットカード（Stripe経由）</td></tr>
                <tr><td className="py-2 font-medium text-gray-600">引渡時期</td><td className="py-2">決済完了後、即時（デジタルコンテンツ）</td></tr>
                <tr><td className="py-2 font-medium text-gray-600">返品・キャンセル</td><td className="py-2">デジタルコンテンツの性質上、購入後の返品・キャンセルはお受けできません</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
