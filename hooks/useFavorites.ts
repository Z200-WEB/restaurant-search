'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Shop } from '@/types/hotpepper'

const KEY = 'favorites'

function getStored(): Shop[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Shop[]>([])

  useEffect(() => {
    setFavorites(getStored())
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.some(s => s.id === id),
    [favorites]
  )

  const toggleFavorite = useCallback((shop: Shop) => {
    setFavorites(prev => {
      const exists = prev.some(s => s.id === shop.id)
      const next = exists ? prev.filter(s => s.id !== shop.id) : [...prev, shop]
      localStorage.setItem(KEY, JSON.stringify(next))
      // Notify other components (e.g. Navbar badge)
      window.dispatchEvent(new Event('favoritesChanged'))
      return next
    })
  }, [])

  return { favorites, isFavorite, toggleFavorite }
}
