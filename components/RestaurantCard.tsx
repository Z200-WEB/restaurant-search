import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Wallet, Heart, Star } from 'lucide-react'
import type { Shop } from '@/types/hotpepper'
import { useFavorites } from '@/hooks/useFavorites'

interface Props {
  shop: Shop
  index?: number
}

export default function RestaurantCard({ shop, index = 0 }: Props) {
  const rawUrl = shop.photo?.pc?.l || shop.photo?.pc?.m || shop.photo?.pc?.s || ''
  const imageUrl = rawUrl
    .replace('http://', 'https://')
    .replace(/_\d+(_s)?\.jpg$/i, '_480.jpg')
  const hasImage = imageUrl && !imageUrl.includes('noimage')

  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(shop.id)

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
        {/* Image */}
        <div className="relative h-44 overflow-hidden" style={{ background: 'var(--border)' }}>
          {hasImage ? (
            <Image
              src={imageUrl}
              alt={shop.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-4xl opacity-30">🍽</div>
            </div>
          )}

          {/* Genre badge */}
          {shop.genre?.name && (
            <div className="absolute top-2.5 left-2.5">
              <span className="badge text-xs">{shop.genre.name}</span>
            </div>
          )}

          {/* Favorite button */}
          <button
            onClick={e => {
              e.preventDefault()
              toggleFavorite(shop)
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
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
        <div className="p-4">
          <h2
            className="font-semibold text-sm leading-snug mb-2 line-clamp-1 transition-colors duration-200 group-hover:opacity-80"
            style={{ color: 'var(--text-primary)' }}
          >
            {shop.name}
          </h2>

          <div className="space-y-1.5">
            {shop.access && (
              <div className="flex items-start gap-1.5">
                <MapPin size={11} className="mt-0.5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
                <p className="text-xs line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
                  {shop.access}
                </p>
              </div>
            )}

            {shop.budget?.average && (
              <div className="flex items-center gap-1.5">
                <Wallet size={11} className="shrink-0" style={{ color: 'var(--text-secondary)' }} />
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {shop.budget.average}
                </p>
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
