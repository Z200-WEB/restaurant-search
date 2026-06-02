'use client'

import { Suspense } from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, SlidersHorizontal } from 'lucide-react'
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

  const [state, setState] = useState<SearchState>({
    shops: [], total: 0, loading: true, error: null,
  })

  const currentPage = Number(searchParams.get('page') || '1')

  const fetchResults = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    const params = new URLSearchParams(searchParams.toString())
    const start = (currentPage - 1) * RESULTS_PER_PAGE + 1
    params.set('start', String(start))
    params.delete('page')
    try {
      const res = await fetch(`/api/search?${params.toString()}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'エラー')
      setState({ shops: data.results?.shop || [], total: data.results?.results_available || 0, loading: false, error: null })
    } catch (err) {
      setState({ shops: [], total: 0, loading: false, error: err instanceof Error ? err.message : 'エラー' })
    }
  }, [searchParams, currentPage])

  useEffect(() => { fetchResults() }, [fetchResults])

  const totalPages = Math.ceil(state.total / RESULTS_PER_PAGE)

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    router.push(`/results?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const desc = [searchParams.get('keyword'), searchParams.get('lat') ? '現在地付近' : null].filter(Boolean).join(' · ')

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <div className='flex items-center gap-3 mb-6'>
        <button onClick={() => router.back()} className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className='text-lg font-semibold text-gray-900'>{desc || '検索結果'}</h1>
          {!state.loading && state.total > 0 && (
            <p className='text-sm text-gray-500'>{state.total.toLocaleString()}件のお店が見つかりました</p>
          )}
        </div>
        {(searchParams.get('genre') || searchParams.get('budget')) && (
          <div className='ml-auto flex items-center gap-1 text-xs text-gray-400'>
            <SlidersHorizontal size={14} /><span>フィルター適用中</span>
          </div>
        )}
      </div>
      {state.loading ? <LoadingGrid count={RESULTS_PER_PAGE} />
        : state.error ? <EmptyState title='エラーが発生しました' message={state.error} />
        : state.shops.length === 0 ? <EmptyState />
        : (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 animate-slide-up'>
              {state.shops.map((shop) => <RestaurantCard key={shop.id} shop={shop} />)}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )
      }
    </div>
  )
}

// Suspense wrapper required by Next.js 14 for useSearchParams()
export default function ResultsPage() {
  return (
    <Suspense fallback={<div className='max-w-6xl mx-auto px-4 py-8'><LoadingGrid count={RESULTS_PER_PAGE} /></div>}>
      <ResultsContent />
    </Suspense>
  )
}
