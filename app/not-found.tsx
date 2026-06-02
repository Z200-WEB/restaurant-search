import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl mb-4">🍜</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">ページが見つかりません</h1>
      <p className="text-gray-500 mb-8">お探しのページは存在しないか、削除された可能性があります。</p>
      <Link
        href="/"
        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
      >
        トップページへ
      </Link>
    </div>
  )
}
