'use client'

import { useRouter } from 'next/navigation'
import SearchForm from '@/components/SearchForm'

export default function HomePage() {
  const router = useRouter()

  const handleGPS = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        router.push(`/results?lat=${lat}&lng=${lng}&range=3&page=1`)
      },
      () => alert('位置情報の取得に失敗しました')
    )
  }

  const handleFavorites = () => router.push('/favorites')

  const handleMaps = () => {
    if (!navigator.geolocation) {
      router.push('/favorites')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        router.push(`/results?lat=${lat}&lng=${lng}&range=3&page=1&viewMode=map`)
      },
      () => router.push('/favorites')
    )
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Hero with food background */}
      <div className="relative pt-16 pb-12 px-4 overflow-hidden min-h-[420px] flex items-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80')" }}
        />
        {/* Dark + accent gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 50%, rgba(234,88,12,0.45) 100%)' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: 'var(--accent)' }} />

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
            { icon: '📍', label: 'GPS検索', desc: '現在地から検索', onClick: handleGPS },
            { icon: '❤️', label: 'お気に入り', desc: 'お店を保存', onClick: handleFavorites },
            { icon: '🗺️', label: 'Maps連携', desc: '地図で確認', onClick: handleMaps },
          ].map(f => (
            <button
              key={f.label}
              onClick={f.onClick}
              className="flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer w-full"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <span className="text-2xl">{f.icon}</span>
              <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{f.label}</span>
              <span className="text-[10px] text-center" style={{ color: 'var(--text-secondary)' }}>{f.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
