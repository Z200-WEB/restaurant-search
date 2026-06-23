'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, GridX, Map } from 'lucide-react'
import RestaurantCard from '@/components/RestaurantCard'
import Pagination from '@/components/Pagination'
import { LoadingGrid } from '@/components/LoadingCard'
import EmptyState from '@/components/EmptyState'
import type { Shop } from '@/types/hotpepper'
import { GENRE_OPTIONS, RADIUS_OPTIONS, RESULTS_PER_PAGE } from '@/lib/constants'

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
    const page = Number(searchParams.get('page') ?? '1')
    const open = searchParams.get('open')

  const [state, setState] = useState<SearchState>({
        shops: [],
        total: 0,
        loading: true,
        error: null,
  })
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')

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
                if (open) params.set('open', open)
                params.set('page', String(page))
                const res = await fetch(`/api/search?${params.toString()}`)
                if (!res.ok) throw new Error('検索に失敗しました')
                const data = await res.json()
                setState({
                          shops: data.results?.shop ?? [],
                          total: data.results?.results_available ?? 0,
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
  }, [lat, lng, range, keyword, genre, budget, open, page])

  useEffect(() => {
        fetchShops()
  }, [fetchShops])

  const totalPages = Math.ceil(state.total / RESULTS_PER_PAGE)

  const handlePageChange = useCallback((newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', String(newPage))
        router.push(`/results?${params.toString()}`)
  }, [searchParams, router])

  const handleGenreChange = useCallback((code: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (code) params.set('genre', code)
        else params.delete('genre')
        params.set('page', '1')
        router.push(`/results?${params.toString()}`)
  }, [searchParams, router])

  const rangeLabel = RADIUS_OPTIONS.find(r => String(r.value) === range)?.label ?? range

  const userLat = lat ? parseFloat(lat) : undefined
    const userLng = lng ? parseFloat(lng) : undefined

  const mapUrl = lat && lng
      ? `https://www.google.com/maps/search/レストラン/@${lat},${lng},15z`
        : null

  return (
        <div className="max-w-5xl mx-auto px-4 py-6">
          {/* Header */}
              <div className="flex items-center gap-3 mb-4 animate-fade-in">
                      <button
                                  onClick={() => router.back()}
                                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                                  style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}
                                >
                                <ArrowLeft size={16} style={{ color: 'var(--text-primary)' }} />
                      </button>button>
                      <div className="flex-1 min-w-0">
                                <h1 className="text-base font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                                  {keyword ? `"${keyword}" の検索結果` : lat ? '近在地周辺の検索結果' : '検索結果'}
                                </h1>h1>
                                <div className="flex items-center gap-2 mt-0.5">
                                  {lat && (
                        <div className="flex items-center gap-1">
                                        <MapPin size={12} style={{ color: 'var(--accent)' }} />
                                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>半径{rangeLabel}</span>span>
                        </div>div>
                                            )}
                                  {!state.loading && (
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{state.total}件</span>span>
                                            )}
                                </div>div>
                      </div>div>
              </div>div>
        
          {/* Grid / Map toggle */}
              <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                      <button
                                  onClick={() => setViewMode('grid')}
                                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-all"
                                  style={{
                                                background: viewMode === 'grid' ? 'var(--accent)' : 'var(--bg-card)',
                                                color: viewMode === 'grid' ? 'white' : 'var(--text-secondary)',
                                  }}
                                >
                                <GridX size={14} />
                                <span className="hidden sm:inline">グリッド</span>span>
                      </button>button>
                      <button
                                  onClick={() => setViewMode('map')}
                                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-all"
                                  style={{
                                                background: viewMode === 'map' ? 'var(--accent)' : 'var(--bg-card)',
                                                color: viewMode === 'map' ? 'white' : 'var(--text-secondary)',
                                  }}
                                >
                                <Map size={14} />
                                <span className="hidden sm:inline">マップ</span>span>
                      </button>button>
              </div>div>
        
          {/* Genre filter chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 mb-4 animate-fade-in" style={{ animationDelay: '60ms' }}>
                {GENRE_OPTIONS.map(g => (
                    <button
                                  key={g.code}
                                  onClick={() => handleGenreChange(g.code)}
                                  className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 hover:scale-105 active:scale-95"
                                  style={{
                                                  background: (genre ?? '') === g.code ? 'var(--accent)' : 'var(--bg-card)',
                                                  color: (genre ?? '') === g.code ? 'white' : 'var(--text-secondary)',
                                                  border: `1px solid ${(genre ?? '') === g.code ? 'var(--accent)' : 'var(--border)'}`,
                                  }}
                                >
                      {g.name}
                    </button>button>
                  ))}
              </div>div>
        
          {/* Map view */}
          {viewMode === 'map' && (
                  <div className="mb-6 rounded-2xl overflow-hidden animate-fade-in" style={{ border: '1px solid var(--border)', height: '380px' }}>
                    {mapUrl ? (
                                <div className="h-full flex flex-col items-center justify-center gap-4" style={{ background: 'var(--bg-card)' }}>
                                              <div className="text-4xl">🗺</div>div>
                                              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                                                {state.shops.length}件のレストランが見つかりました
                                              </p>p>
                                              <a
                                                                href={mapUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                                                                style={{ background: 'var(--accent)' }}
                                                                onClick={(e) => e.stopPropagation()}
                                                              >
                                                              <Map size={16} />
                                                              Google Mapsで開く
                                              </a>a>
                                              <div className="grid grid-cols-2 gap-2 mt-2 w-full max-w-sm px-4">
                                                {state.shops.slice(0, 4).map(shop => (
                                                    <div key={shop.id} className="text-xs px-2 py-1 rounded-lg truncate text-center" style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>
                                                                        📍 {shop.name}
                                                    </div>div>
                                                  ))}
                                              </div>div>
                                </div>div>
                              ) : (
                                <div className="h-full flex items-center justify-center" style={{ background: 'var(--bg-card)' }}>
                                              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>位置情報が必要です</p>p>
                                </div>div>
                            )}
                  </div>div>
              )}
        
          {/* Content */}
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
                                  <RestaurantCard
                                                    key={shop.id}
                                                    shop={shop}
                                                    index={index}
                                                    userLat={userLat}
                                                    userLng={userLng}
                                                  />
                                ))}
                            </div>div>
                            <div className="mt-8">
                                        <Pagination
                                                        currentPage={page}
                                                        totalPages={totalPages}
                                                        onPageChange={handlePageChange}
                                                      />
                            </div>div>
                  </>>
                )}
        </div>div>
      )
}

export default function ResultsPage() {
    return <ResultsContent />
}</></div>
