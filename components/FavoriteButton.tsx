'use client'

import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFavorites } from '@/hooks/useFavorites'
import type { Shop } from '@/types/hotpepper'

interface FavoriteButtonProps {
    shop: Shop
}

// Wrapper component for toggling favorites on a shop.
// Uses the useFavorites hook so all favorites logic stays in one place.
export default function FavoriteButton({ shop }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites()
    const favorited = isFavorite(shop.id)

  return (
        <button
                onClick={() => toggleFavorite(shop)}
                aria-label={favorited ? 'お気に入りから削除' : 'お気に入りに追加'}
                className={cn(
                          'flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-sm transition-all',
                          favorited
                            ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-400'
                        )}
              >
              <Heart size={18} className={cn('transition-all', favorited ? 'fill-red-500 text-red-500' : '')} />
          {favorited ? 'お気に入り済み' : 'お気に入りに追加'}
        </button>button>
      )
}</button>
