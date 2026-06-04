'use client'

import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import RestaurantCard from '@/components/RestaurantCard'
import EmptyState from '@/components/EmptyState'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8 animate-fade-in">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
          <Heart size={18} className="text-white fill-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>お気に入り</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{favorites.length}件のレストラン</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <EmptyState type="favorites" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-stagger">
          {favorites.map((shop, i) => (
            <RestaurantCard key={shop.id} shop={shop} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
