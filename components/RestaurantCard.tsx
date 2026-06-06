import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Wallet, Heart, Star, Navigation } from 'lucide-react'
import type { Shop } from '@/types/hotpepper'
import { useFavorites } from '@/hooks/useFavorites'

interface Props {
  shop: Shop
  index?: number
  userLat?: number
  userLng?: number
}

function calcDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function formatDistance(m: number): string {
  if (m < 1000) return `${Math.round(m / 50) * 50}m`
  return `${(m / 1000).toFixed(1)}km`
}

function BudgetPips({ code }: { code?: string }) {
  const level = code ? ({ B001: 1, B002: 2, B003: 2, B004: 3, B005: 3, B006: 4, B007: 4, B008: 4 } as Record<string, number>)[code] ?? 2 : 2
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4].map(i => (
        <span key={i} className="text-[10px]" style={{ color: i <= level ? 'var(--accent)' : 'var(--border)' }}>¥</span>
      ))}
    </div>
  )
}

export default function RestaurantCard({ shop, index = 0, userLat, userLng }: Props) {
  const rawUrl = shop.photo?.pc?.l || shop.photo?.pc?.m || shop.photo?.pc?.s || ''
  const imageUrl = rawUrl
    .replace('http://', 'https://')
    .replace(/(\/\d+(_s?))\.jpg$/i, '_480.jpg')
  const hasImage = imageUrl && !imageUrl.includes('noimage')

  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(shop.id)

  const distance = userLat && userLng && shop.lat && shop.lng
    ? calcDistance(userLat, userLng, shop.lat, shop.lng)
    : null

  return (
    <Link
      href={`/restaurant/${shop.id}`}
      className="block group animate-fade-in"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      <article
        className="card-hover overflow-hidden rounded-2xl cursor-pointer relative"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        {/* Image with gradient overlay */}
        <div className="relative h-48 overflow-hidden" style={{ background: 'var(--border)' }}>
          {hasImage ? (
            <>
              <Image
                src={imageUrl}
                alt={shop.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
              />
              {/* Gradient overlay bottom */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-4xl opacity-30">🍽️</div>
            </div>
          )}

          {/* Genre badge — bottom left on image */}
          {shop.genre?.name && (
            <div className="absolute bottom-2.5 left-3">
              <span className="badge text-xs px-2 py-0.5">{shop.genre.name}</span>
            </div>
          )}

          {/* Distance pill — bottom right on image */}
          {distance !== null && (
            <div className="absolute bottom-2.5 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}>
              <Navigation size={10} className="shrink-0" />
              {formatDistance(distance)}
            </div>
          )}

          {/* Favorite button */}
          <button
            onClick={e => { e.preventDefault(); toggleFavorite(shop) }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
            style={{
              background: favorited ? 'var(--accent)' : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              boxShadow: 'var(--shadow-sm)',
            }}
            aria-label={favorited ? 'お気に入り解除' : 'お気に入り登録'}
          >
            <Heart
              size={14}
              className={favorited ? 'fill-white text-white' : ''}
              style={{ color: favorited ? 'white' : 'var(--accent)' }}
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-3.5">
          <h2
            className="font-semibold text-sm leading-snug mb-2 line-clamp-1 transition-colors duration-200 group-hover:opacity-80"
            style={{ color: 'var(--text-primary)' }}
          >
            {shop.name}
          </h2>

          <div className="space-y-1.5">
            {shop.access && (
              <div className="flex items-start gap-1.5">
                <MapPin size={11} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                <p className="text-xs line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
                  {shop.access}
                </p>
              </div>
            )}

            {/* Budget pips + average */}
            {shop.budget && (
              <div className="flex items-center gap-2">
                <BudgetPips code={shop.budget.code} />
                {shop.budget.average && (
                  <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                    {shop.budget.average}
                  </p>
                )}
              </div>
            )}
          </div>

          {shop.catch && (
            <p className="text-xs mt-2 line-clamp-1 font-medium" style={{ color: 'var(--accent)' }}>
              {shop.catch}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}
