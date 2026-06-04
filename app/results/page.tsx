'use client'

import { Suspense } from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, MapPin } from 'lucide-react'
import RestaurantCard from '@/components/RestaurantCard'
import Pagination from '@/components/Pagination'
import { LoadingGrid } from '@/components/LoadingCard'
import EmptyState from '@/components/EmptyState'
import type { Shop } from '@/types/hotpepper'
import { RESULTS_PER_PAGE } from '@/lib/constants'

interface SearchState {
  shops: Shop[]
  total: number
  loading: boolean
  error: string | null
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const range = searchParams.get('range') ?? '3'
  const keyword = searchParams.get('keyword')
  const genre = searchParams.get('genre')
  const budget = searchParams.get('budget')
  const page = parseInt(searchParams.get('page') ?? '1')

  const [state, setState] = useState<SearchState>({
    shops: [],
    total: 0,
    loading: true,
    error: null,
  })

  const fetchShops = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const params = new URLSearchParams()
      if (lat) params.set('lat', lat)
      if (lng) params.set('lng', lng)
      params.set('range', range)
      if (keyword) params.set('keyword', keyword)
      if (genre) params.set('genre', genre)
      if (budget) params.set('budget', budget)
      params.set('page', String(page))
      const res = await fetch(`/api/search?${params.toString()}`)
      if (!res.ok) throw new Error('検索に失敗しました')
      const data = await res.json()
      setState({
        shops: data.shops,
        total: data.total,
        loading: false,
        error: null,
      })
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : '検索に失敗しました',
      }))
    }
  }, [lat, lng, range, keyword, genre, budget, page])

  useEffect(() => {
    fetchShops()
  }, [fetchShops])

  const totalPages = Math.ceil(state.total / RESULTS_PER_PAGE)

  const handlePageChange = useCallback((newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(newPage))
    router.push(`/results?${params.toString()}`)
  }, [searchParams, router])

  const rangeLabels: Record<string, string> = {
    '1': '300m',
    '2': '500m',
    '3': '1km',
    '4': '2km',
    '5': '3km',
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6 animate-fade-in">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}
        >
          <ArrowLeft size={16} style={{ color: 'var(--text-primary)' }} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold truncate" style={{ color: 'var(--text-primary)' }}>
            {keyword ? `"${keyword}" の検索結果` : lat ? '現在地周辺の検索結果' : '検索結果'}
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            {lat && (
              <div className="flex items-center gap-1">
                <MapPin size={12} style={{ color: 'var(--accent)' }} />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  半径{rangeLabels[range]}
                </span>
              </div>
            )}
            {!state.loading && (
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {state.total}件
              </span>
            )}
          </div>
        </div>
      </div>

      {state.loading ? (
        <LoadingGrid count={6} />
      ) : state.error ? (
        <EmptyState variant="error" message={state.error} onRetry={fetchShops} />
      ) : state.shops.length === 0 ? (
        <EmptyState variant="no-results" onRetry={() => router.back()} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-stagger">
            {state.shops.map((shop, index) => (
              <RestaurantCard key={shop.id} shop={shop} index={index} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-6"><LoadingGrid count={6} /></div>}>
      <ResultsContent />
    </Suspense>
  )
}
