'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SearchForm from '@/components/SearchForm'

const BG_PHOTOS = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80',
  'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=1920&q=80',
  'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&q=80',
]

export default function HomePage() {
  const router = useRouter()
  const [currentPhoto, setCurrentPhoto] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto(prev => (prev + 1) % BG_PHOTOS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleGPS = () => {
    if (!navigator.geolocation) {
      alert('お使いのブラウザは位置情報に対応していません')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: a, longitude: o } = pos.coords
        router.push(`/results?lat=${a}&lng=${o}&range=3&page=1`)
      },
      () => alert('位置情報の取得に失敗しました。設定を確認してください。')
    )
  }

  const handleOpenNow = () => {
    if (!navigator.geolocation) {
      alert('お使いのブラウザは位置情報に対応していません')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: a, longitude: o } = pos.coords
        router.push(`/results?lat=${a}&lng=${o}&range=3&page=1&open=1`)
      },
      () => alert('位置情報の取得に失敗しました。設定を確認してください。')
    )
  }

  const handleFavorites = () => {
    router.push('/favorites')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="relative flex-1 flex items-center justify-center min-h-[520px] overflow-hidden">

        {/* Slideshow backgrounds */}
        {BG_PHOTOS.map((photo, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${photo}')`,
              opacity: idx === currentPhoto ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: idx === currentPhoto ? 1 : 0,
            }}
          />
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" style={{ zIndex: 2 }} />

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 10 }}>
          {BG_PHOTOS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPhoto(idx)}
              className="rounded-full transition-all duration-300"
              style={{
                width: idx === currentPhoto ? '24px' : '8px',
                height: '8px',
                background: idx === currentPhoto ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
              }}
              aria-label={`Photo ${idx + 1}`}
            />
          ))}
        </div>

        {/* Orange bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: 'var(--accent)', zIndex: 3 }} />

        {/* Content */}
        <div className="max-w-lg mx-auto relative w-full" style={{ zIndex: 4 }}>
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
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 cursor-pointer"
          >
            <span className="text-2xl">📍</span>
            <div>
              <div className="font-semibold text-sm text-white">現在地で探す</div>
              <div className="text-xs text-white/50 mt-0.5">GPS検索</div>
            </div>
          </button>
          <button
            onClick={handleOpenNow}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 cursor-pointer"
          >
            <span className="text-2xl">🔥</span>
            <div>
              <div className="font-semibold text-sm text-white">今すぐ開いてる</div>
              <div className="text-xs text-white/50 mt-0.5">営業中の店のみ</div>
            </div>
          </button>
          <button
            onClick={handleFavorites}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 cursor-pointer"
          >
            <span className="text-2xl">⭐</span>
            <div>
              <div className="font-semibold text-sm text-white">お気に入り</div>
              <div className="text-xs text-white/50 mt-0.5">お店を保存</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
