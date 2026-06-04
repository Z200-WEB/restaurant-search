import SearchForm from '@/components/SearchForm'

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Hero */}
      <div
        className="relative pt-14 pb-10 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, var(--accent-light) 0%, var(--bg-primary) 100%)' }}
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'var(--accent)' }} />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'var(--accent)' }} />
        <div className="max-w-lg mx-auto relative">
          <div className="flex justify-center mb-5">
            <span className="badge text-xs px-3 py-1.5 font-semibold">Hot Pepper Gourmet</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-center leading-tight mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            近くの<span style={{ color: 'var(--accent)' }}>美味しい</span><br />お店を探す
          </h1>
          <p className="text-center text-base mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            現在地から近いレストランを簡単に検索
          </p>
          <SearchForm />
        </div>
      </div>
      {/* Features */}
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-3">
          {[{ icon: '📍', label: 'GPS検索' },{ icon: '❤️', label: 'お気に入り' },{ icon: '🗺️', label: 'Maps連携' }].map(f => (
            <div key={f.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <span className="text-2xl">{f.icon}</span>
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
