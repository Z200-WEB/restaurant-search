import SearchForm from '@/components/SearchForm'

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Hero with food background */}
      <div className="relative pt-16 pb-12 px-4 overflow-hidden min-h-[420px] flex items-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(20,10,0,0.75) 50%, rgba(180,60,0,0.45) 100%)' }} />
        {/* Orange glow blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: 'var(--accent)' }} />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'var(--accent)' }} />

        <div className="max-w-lg mx-auto relative w-full">
          <div className="flex justify-center mb-5">
            <span className="badge text-xs px-3 py-1.5 font-semibold tracking-widest uppercase">Hot Pepper Gourmet</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-center leading-tight mb-3 tracking-tight text-white drop-shadow-lg">
            近くの<span style={{ color: 'var(--accent)' }}>美味しい</span><br />お店を探す
          </h1>
          <p className="text-center text-base mb-8 leading-relaxed text-white/70">
            現在地から近いレストランを簡単に検索
          </p>
          <SearchForm />
        </div>
      </div>

      {/* Features */}
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: '📍', label: 'GPS検索', desc: '現在地から検索' },
            { icon: '❤️', label: 'お気に入り', desc: 'お店を保存' },
            { icon: '🗺️', label: 'Maps連携', desc: '地図で確認' },
          ].map(f => (
            <div key={f.label} className="flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-transform hover:scale-105" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <span className="text-2xl">{f.icon}</span>
              <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{f.label}</span>
              <span className="text-[10px] text-center" style={{ color: 'var(--text-secondary)' }}>{f.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
