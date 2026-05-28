import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-6 block">← トップに戻る</Link>
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <h1 className="text-xl font-bold text-gray-800">プライバシーポリシー</h1>
          <p className="text-xs text-gray-400">最終更新: 2026年5月28日</p>

          <div className="text-sm text-gray-700 leading-relaxed space-y-4">
            <h2 className="text-base font-bold text-gray-800 mt-6">1. 収集する情報</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>セルフチェックの回答データ（匿名・アカウント不要）</li>
              <li>有料レポート購入時のメールアドレス（購入者のみ）</li>
            </ul>

            <h2 className="text-base font-bold text-gray-800 mt-6">2. 利用目的</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>セルフチェック結果の生成・表示</li>
              <li>有料レポートの生成・送付</li>
              <li>サービスの改善・統計分析（匿名化して利用）</li>
            </ul>

            <h2 className="text-base font-bold text-gray-800 mt-6">3. 第三者への提供</h2>
            <p>個人情報を第三者に提供することはありません。ただし、以下の場合を除きます：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>法令に基づく場合</li>
              <li>決済処理のためにStripe社に必要最小限の情報を送信する場合</li>
            </ul>

            <h2 className="text-base font-bold text-gray-800 mt-6">4. データの保管</h2>
            <p>回答データはSupabase（米国）のサーバーに保存されます。匿名データとして保管され、個人を特定することはできません。</p>

            <h2 className="text-base font-bold text-gray-800 mt-6">5. Cookieの使用</h2>
            <p>本サービスはサービス提供に必要な最小限のCookieを使用します。</p>

            <h2 className="text-base font-bold text-gray-800 mt-6">6. お問い合わせ</h2>
            <p>プライバシーに関するお問い合わせは、HITONEの運営までご連絡ください。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
