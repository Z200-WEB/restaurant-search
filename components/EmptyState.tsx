import { SearchX } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  title?: string
  message?: string
  showBackButton?: boolean
}

export default function EmptyState({
  title = 'お店が見つかりませんでした',
  message = '検索条件を変えてもう一度お試しください',
  showBackButton = true,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <SearchX size={28} className="text-gray-400" />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm max-w-xs mb-6">{message}</p>

      {showBackButton && (
        <Link
          href="/"
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors"
        >
          検索に戻る
        </Link>
      )}
    </div>
  )
}
