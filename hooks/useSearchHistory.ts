'use client'

import { useState, useEffect, useCallback } from 'react'

export interface SearchHistoryItem {
  keyword: string
  lat?: number
  lng?: number
  range: number
  label: string
  timestamp: number
}

const KEY = 'searchHistory'
const MAX = 5

function getStored(): SearchHistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([])

  useEffect(() => {
    setHistory(getStored())
  }, [])

  const addHistory = useCallback((item: Omit<SearchHistoryItem, 'timestamp'>) => {
    setHistory(prev => {
      // Remove duplicate keyword
      const filtered = prev.filter(h => h.label !== item.label)
      const next = [{ ...item, timestamp: Date.now() }, ...filtered].slice(0, MAX)
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    localStorage.removeItem(KEY)
    setHistory([])
  }, [])

  return { history, addHistory, clearHistory }
}
