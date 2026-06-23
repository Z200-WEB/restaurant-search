'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SearchForm from '@/components/SearchForm'

const BG_PHOTOS = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80',
    'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=1920&q=80',
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&q=80',
  ]

function navigateWithGeolocation(
    router: ReturnType<typeof useRouter>,
    extraParams?: string
  ) {
    if (!navigator.geolocation) {
          alert('お使いのブラウザは位置情報に対応していません')
          return
    }
    navigator.geolocation.getCurrentPosition(
          (pos) => {
                  const { latitude: lat, longitude: lng } = pos.coords
                  router.push(`/results?lat=${lat}&lng=${lng}&range=3&page=1${extraParams ?? ''}`)
          },
          () => alert('位置情報の取得に失敗しました。設定を確認してください。')
        )
}

export default function HomePage() {
    const router = useRouter()
    const [currentPhoto, setCurrentPhoto] = useState(0)

  useEffect(() => {
        const timer = setInterval(() => {
                setCurrentPhoto(prev => (prev + 1) % BG_PHOTOS.length)
        }, 5000)
        return () => clearInterval(timer)
  }, [])

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
              
                {/* Dark overlay so text is always readable */}
                      <div className="absolute inset-0 bg-black/60" style={{ zIndex: 2 }} />
              
                {/* Content */}
                      <div className="max-w-lg mx-auto relative w-full" style={{ zIndex: 4 }}>
                                <h1 className="text-4xl sm:text-5xl font-bold text-center leading-tight mb-3 tracking-tight text-white drop-shadow-lg">
                                            近くの<span style={{ color: 'var(--accent)' }}>美味しい</span>span><br />お店を探す
                                </h1>h1>
                                <p className="text-center text-base mb-8 leading-relaxed text-white/70">
                                            現在地から近いレストランを簡単に検索
                                </p>p>
                                <SearchForm />
                      </div>div>
              </div>div>
        
          {/* Features */}
              <div style={{ background: 'var(--bg-secondary, #1a1a1a)' }}>
                      <div className="max-w-lg mx-auto px-4 py-8">
                                <div className="grid grid-cols-3 gap-3">
                                            <button
                                                            onClick={() => navigateWithGeolocation(router)}
                                                            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/10 transition-all duration-200 cursor-pointer hover:border-white/30"
                                                            style={{ background: 'rgba(255,255,255,0.07)' }}
                                                          >
                                                          <span className="text-2xl">📍</span>span>
                                                          <div>
                                                                          <div className="font-semibold text-sm text-white">現在地で探す</div>div>
                                                                          <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>GPS検索</div>div>
                                                          </div>div>
                                            </button>button>
                                            <button
                                                            onClick={() => navigateWithGeolocation(router, '&open=1')}
                                                            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/10 transition-all duration-200 cursor-pointer hover:border-white/30"
                                                            style={{ background: 'rgba(255,255,255,0.07)' }}
                                                          >
                                                          <span className="text-2xl">🔥</span>span>
                                                          <div>
                                                                          <div className="font-semibold text-sm text-white">今すぐ開いてる</div>div>
                                                                          <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>営業中の店のみ</div>div>
                                                          </div>div>
                                            </button>button>
                                            <button
                                                            onClick={() => router.push('/favorites')}
                                                            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/10 transition-all duration-200 cursor-pointer hover:border-white/30"
                                                            style={{ background: 'rgba(255,255,255,0.07)' }}
                                                          >
                                                          <span className="text-2xl">⭐</span>span>
                                                          <div>
                                                                          <div className="font-semibold text-sm text-white">お気に入り</div>div>
                                                                          <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>お店を保存</div>div>
                                                          </div>div>
                                            </button>button>
                                </div>div>
                      </div>div>
              </div>div>
        </div>div>
      )
}</div>
