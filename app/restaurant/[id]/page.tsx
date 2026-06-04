'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, MapPin, Wallet, Clock, Phone, Heart, Map, ExternalLink } from 'lucide-react'
import type { Shop } from '@/types/hotpepper'
import { useFavorites } from '@/hooks/useFavorites'

export default function RestaurantDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    if (!id) return
    const fetchShop = async () => {
      try {
        const res = await fetch(`/api/restaurant/${id}`)
        if (!res.ok) throw new Error('店舗情報の取得に失敗しました')
        const data = await res.json()
        setShop(data.shop)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました')
      } finally {
        setLoading(false)
      }
    }
    fetchShop()
  }, [id])

  const openMaps = () => {
    if (!shop) return
    const q = shop.lat && shop.lng
      ? `${shop.lat},${shop.lng}`
      : encodeURIComponent(`${shop.name} ${shop.address}`)
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank', 'noopener')
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
        <div className="skeleton h-9 w-20 rounded-xl mb-6" />
        <div className="skeleton h-64 w-full rounded-3xl mb-6" />
        <div className="space-y-3">
          <div className="skeleton h-7 w-3/4 rounded-xl" />
          <div className="skeleton h-4 w-full rounded-xl" />
          <div className="skeleton h-4 w-2/3 rounded-xl" />
        </div>
      </div>
    )
  }

  if (error || !shop) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <button onClick={() => router.back()} className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={16} /> 戻る
        </button>
        <div className="text-center py-16">
          <p className="text-4xl mb-4">😕</p>
          <p style={{ color: 'var(--text-secondary)' }}>{error || '店舗が見つかりません'}</p>
        </div>
      </div>
    )
  }

  const imageUrl = (shop.photo?.pc?.l || shop.photo?.pc?.m || shop.photo?.pc?.s || '')
    .replace('http://', 'https://')
    .replace(/_\d+(_s)?\.jpg$/i, '_480.jpg')
  const hasImage = imageUrl && !imageUrl.includes('noimage')
  const favorited = isFavorite(shop.id)

  const infoRows = [
    shop.access && { icon: <MapPin size={15} />, label: 'アクセス', value: shop.access },
    shop.address && { icon: <MapPin size={15} />, label: '住所', value: shop.address },
    shop.budget?.average && { icon: <Wallet size={15} />, label: '予算', value: shop.budget.average },
    shop.open && { icon: <Clock size={15} />, label: '営業時間', value: shop.open },
    shop.close && { icon: <Clock size={15} />, label: '定休日', value: shop.close },
    shop.tel && { icon: <Phone size={15} />, label: '電話', value: shop.tel },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <button onClick={() => router.back()} className="flex items-center gap-2 mb-5 text-sm font-medium transition-opacity hover:opacity-60" style={{ color: 'var(--text-secondary)' }}>
        <ArrowLeft size={15} /> 戻る
      </button>

      {/* Hero */}
      <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden mb-5" style={{ background: 'var(--border)' }}>
        {hasImage ? (
          <Image src={imageUrl} alt={shop.name} fill className="object-cover" sizes="100vw" />
        ) : (
          <div className="h-full flex items-center justify-center text-6xl opacity-20">🍽</div>
        )}
        <button
          onClick={() => toggleFavorite(shop)}
          className="absolute top-4 right-4 w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
          style={{ background: favorited ? 'var(--accent)' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', boxShadow: 'var(--shadow-md)' }}
        >
          <Heart size={18} className={favorited ? 'fill-white text-white' : ''} style={{ color: favorited ? 'white' : 'var(--accent)' }} />
        </button>
        {shop.genre?.name && (
          <div className="absolute bottom-4 left-4"><span className="badge">{shop.genre.name}</span></div>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-1.5 leading-tight" style={{ color: 'var(--text-primary)' }}>{shop.name}</h1>
      {shop.catch && <p className="text-sm font-medium mb-5" style={{ color: 'var(--accent)' }}>{shop.catch}</p>}

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button onClick={openMaps} className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98]" style={{ background: '#1a73e8', color: 'white', boxShadow: '0 2px 12px rgba(26,115,232,0.3)' }}>
          <Map size={16} /> Google Maps
        </button>
        {shop.urls?.pc && (
          <a href={shop.urls.pc} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 hover:opacity-80 active:scale-[0.98]" style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border)', color: 'var(--text-primary)' }}>
            <ExternalLink size={16} /> 詳細を見る
          </a>
        )}
      </div>

      {/* Info */}
      <div className="rounded-3xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        {infoRows.map((item, i) => (
          <div key={i} className="flex gap-3 p-4" style={{ borderBottom: i < infoRows.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>{item.icon}</div>
            <div>
              <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
