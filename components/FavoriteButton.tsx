'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'restaurant_favorites'

function getFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

interface FavoriteButtonProps {
  shopId: string
  shopName: string
}

// localStorage-based favorites
// useEffect prevents SSR/hydration mismatch since localStorage is browser-only
export default function FavoriteButton({ shopId, shopName }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsFavorite(getFavorites().includes(shopId))
  }, [shopId])

  const toggle = () => {
    const favorites = getFavorites()
    const updated = isFavorite
      ? favorites.filter((id) => id !== shopId)
      : [...favorites, shopId]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setIsFavorite(!isFavorite)
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      aria-label={isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
      className={cn(
        'flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-sm transition-all',
        isFavorite
          ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'
          : 'bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-400'
      )}
    >
      <Heart size={18} className={cn('transition-all', isFavorite ? 'fill-red-500 text-red-500' : '')} />
      {isFavorite ? 'お気に入り済み' : 'お気に入りに追加'}
    </button>
  )
}
