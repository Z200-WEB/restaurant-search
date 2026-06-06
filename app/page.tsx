'use client'

import { useRouter } from 'next/navigation'
import SearchForm from '@/components/SearchForm'

export default function HomePage() {
  const router = useRouter()

  // 現在地で探す: GPS → results (grid)
  const handleGPS = () => {
    if (!navigator.geolocation) {
      alert('お使いのブラウザは位置情報に対応していません')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        router.push(`/results?lat=${lat}&lng=${lng}&range=3&page=1`)
      },
      () => alert('位置情報の取得に失敗しました。ブラウザの設定をご確認ください。')
    )
  }

  // 今すぐ開いてる店: GPS + open=1 フィルター
  const handleOpenNow = () => {
    if (!navigator.geolocation) {
      alert('お使いのブラウザは位置情報に対応していません')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        router.push(`/results?lat=${lat}&lng=${lng}&range=3&page=1&open=1`)
      },
      () => alert('位置情報の取得に失敗しました。ブラウザの設定をご確認ください。')
    )
  }

  // お気に入り: saved list
  const handleFavorites = () => router.push('/favorites')

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Hero with food background */}
      <div className="relative pt-16 pb-12 px-4 overflow-hidden min-h-[420px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80')" }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 50%, rgba(234,88,12,0.45) 100%)' }} />
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
          <button
            onClick={handleGPS}
            className="flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer w-full"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <span className="text-2xl">📍</span>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>現在地で探す</span>
            <span className="text-[10px] text-center" style={{ color: 'var(--text-secondary)' }}>GPS検索</span>
          </button>

          <button
            onClick={handleOpenNow}
            className="flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer w-full"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <span className="text-2xl">🔥</span>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>今すぐ開いてる</span>
            <span className="text-[10px] text-center" style={{ color: 'var(--text-secondary)' }}>営業中の店のみ</span>
          </button>

          <button
            onClick={handleFavorites}
            className="flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer w-full"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <span className="text-2xl">⭐</span>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>お気に入り</span>
            <span className="text-[10px] text-center" style={{ color: 'var(--text-secondary)' }}>お店を保存</span>
          </button>
        </div>
      </div>
    </div>
  )
}
