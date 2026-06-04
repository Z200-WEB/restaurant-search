type EmptyVariant = 'no-results' | 'error' | 'favorites'

interface EmptyStateProps {
  variant?: EmptyVariant
  message?: string
  onRetry?: () => void
}

export default function EmptyState({ variant = 'no-results', message, onRetry }: EmptyStateProps) {
  const configs: Record<EmptyVariant, { emoji: string; title: string; desc: string }> = {
    'no-results': {
      emoji: '🔍',
      title: '検索結果が見つかりません',
      desc: message || '別のキーワードや検索条件をお試しください',
    },
    'error': {
      emoji: '⚠️',
      title: 'エラーが発生しました',
      desc: message || 'しばらくしてから再度お試しください',
    },
    'favorites': {
      emoji: '❤️',
      title: 'お気に入りがありません',
      desc: 'レストランカードのハートボタンを押してお気に入り登録できます',
    },
  }

  const { emoji, title, desc } = configs[variant]

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-6"
        style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-md)' }}
      >
        {emoji}
      </div>
      <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm max-w-xs leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
        {desc}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary px-6 py-3 text-sm">
          もう一度試す
        </button>
      )}
    </div>
  )
}
