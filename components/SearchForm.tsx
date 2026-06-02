'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Search, Loader2, ChevronDown } from 'lucide-react'
import { useGeolocation } from '@/hooks/useGeolocation'
import { RADIUS_OPTIONS, GENRE_OPTIONS, BUDGET_OPTIONS } from '@/lib/constants'

export default function SearchForm() {
  const router = useRouter()
  const { lat, lng, loading: geoLoading, error: geoError, getLocation } = useGeolocation()

  const [keyword, setKeyword] = useState('')
  const [range, setRange] = useState(3)
  const [genre, setGenre] = useState('')
  const [budget, setBudget] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [formError, setFormError] = useState('')

  const handleSearch = () => {
    setFormError('')

    if (!lat && !keyword.trim()) {
      setFormError('現在地を取得するか、キーワードを入力してください')
      return
    }

    const params = new URLSearchParams()
    if (lat) params.set('lat', String(lat))
    if (lng) params.set('lng', String(lng))
    params.set('range', String(range))
    if (keyword.trim()) params.set('keyword', keyword.trim())
    if (genre) params.set('genre', genre)
    if (budget) params.set('budget', budget)

    router.push(`/results?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-left animate-fade-in">
      {/* Location button */}
      <div className="mb-4">
        <button
          onClick={getLocation}
          disabled={geoLoading}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-3 px-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
        >
          {geoLoading ? <Loader2 size={18} className="animate-spin" /> : <MapPin size={18} />}
          {geoLoading ? '位置情報を取得中...' : '現在地を使って検索'}
        </button>

        {lat && (
          <p className="mt-2 text-sm text-green-600">
            ✓ 位置情報を取得しました ({lat.toFixed(4)}, {lng?.toFixed(4)})
          </p>
        )}
        {geoError && <p className="mt-2 text-sm text-red-500">{geoError}</p>}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">または</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Keyword */}
      <div className="mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="キーワード（例：渋谷 居酒屋）"
            className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Radius selector (only when location acquired) */}
      {lat && (
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-2">検索範囲</label>
          <div className="flex gap-2">
            {RADIUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRange(opt.value)}
                className={`flex-1 py-2 text-sm rounded-lg border transition-all ${
                  range === opt.value
                    ? 'bg-orange-500 text-white border-orange-500 font-medium'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 mb-4 transition-colors"
      >
        <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        こだわり条件
      </button>

      {/* Extra filters */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 animate-fade-in">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">ジャンル</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              {GENRE_OPTIONS.map((g) => (
                <option key={g.code} value={g.code}>{g.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">予算（ディナー）</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              {BUDGET_OPTIONS.map((b) => (
                <option key={b.code} value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Error */}
      {formError && (
        <p className="mb-3 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{formError}</p>
      )}

      {/* Submit */}
      <button
        onClick={handleSearch}
        className="w-full bg-gray-900 hover:bg-gray-700 text-white font-medium py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
      >
        レストランを検索
      </button>
    </div>
  )
}
