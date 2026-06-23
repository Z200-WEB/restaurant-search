'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Search, Loader2, ChevronDown, Clock, Navigation } from 'lucide-react'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import { RADIUS_OPTIONS, GENRE_OPTIONS, BUDGET_OPTIONS } from '@/lib/constants'

export default function SearchForm() {
    const router = useRouter()
    const { lat, lng, loading: geoLoading, error: geoError, permissionDenied, getLocation } = useGeolocation()
    const { history, addHistory, clearHistory } = useSearchHistory()

  const [keyword, setKeyword] = useState('')
    const [range, setRange] = useState(3)
    const [genre, setGenre] = useState('')
    const [budget, setBudget] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [formError, setFormError] = useState('')

  const handleSearch = (overrides?: { keyword?: string; lat?: number; lng?: number; range?: number }) => {
        setFormError('')
        const kw = overrides?.keyword ?? keyword
        const useLat = overrides?.lat ?? lat
        const useLng = overrides?.lng ?? lng
        const useRange = overrides?.range ?? range

        if (!useLat && !kw.trim()) {
                setFormError('現在地を取得するか、キーワードを入力してください')
                return
        }

        // Save to search history
        const label = kw.trim() || '現在地周辺'
        addHistory({ keyword: kw.trim(), lat: useLat ?? undefined, lng: useLng ?? undefined, range: useRange, label })

        const params = new URLSearchParams()
        if (useLat) params.set('lat', String(useLat))
        if (useLng) params.set('lng', String(useLng))
        params.set('range', String(useRange))
        if (kw.trim()) params.set('keyword', kw.trim())
        if (genre) params.set('genre', genre)
        if (budget) params.set('budget', budget)

        router.push(`/results?${params.toString()}`)
  }

  const handleHistoryClick = (item: ReturnType<typeof useSearchHistory>['history'][number]) => {
        setKeyword(item.keyword)
        handleSearch({ keyword: item.keyword, lat: item.lat, lng: item.lng, range: item.range })
  }

  return (
        <div
                className="rounded-3xl overflow-hidden animate-fade-in"
                style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}
              >
          {/* Location button */}
              <div className="p-5 pb-4">
                      <button
                                  onClick={getLocation}
                                  disabled={geoLoading}
                                  className="w-full btn-primary py-3.5 text-sm rounded-2xl"
                                >
                        {geoLoading ? (
                                              <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                              <Navigation size={16} />
                                            )}
                        {geoLoading ? '位置情報を取得中...' : lat ? '現在地を更新する' : '現在地を使って検索'}
                      </button>button>
              
                {/* Location success */}
                {lat && (
                          <div className="flex items-center gap-1.5 mt-2.5 px-1">
                                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                      <p className="text-xs font-medium text-green-600 dark:text-green-400">
                                                    現在地を取得しました ({lat.toFixed(4)}, {lng?.toFixed(4)})
                                      </p>p>
                          </div>div>
                      )}
              
                {/* Location error */}
                {geoError && (
                          <div
                                        className="mt-2.5 p-3 rounded-xl text-sm"
                                        style={{ background: permissionDenied ? 'rgba(251,146,60,0.1)' : 'rgba(239,68,68,0.08)' }}
                                      >
                                      <p style={{ color: permissionDenied ? 'var(--accent)' : '#ef4444' }}>{geoError}</p>p>
                            {permissionDenied && (
                                                      <p className="mt-1 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                                                      💡 設定 → ブラウザ → 位置情報 → 許可
                                                      </p>p>
                                      )}
                          </div>div>
                      )}
              </div>div>
        
          {/* Divider */}
              <div className="flex items-center gap-1 px-5 pb-4">
                      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                      <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>または</span>span>
                      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              </div>div>
        
          {/* Keyword input */}
              <div className="px-5 pb-4">
                      <div className="relative">
                                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                                <input
                                              type="text"
                                              value={keyword}
                                              onChange={(e) => setKeyword(e.target.value)}
                                              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                              placeholder="店名・エリア・料理ジャンル..."
                                              className="input-base pl-10"
                                            />
                      </div>div>
              </div>div>
        
          {/* Range selector */}
              <div className="px-5 pb-4">
                      <div className="flex gap-2">
                        {RADIUS_OPTIONS.map(opt => (
                            <button
                                            key={opt.value}
                                            onClick={() => setRange(opt.value)}
                                            className="flex-1 py-2 text-xs font-medium rounded-xl transition-all duration-200"
                                            style={{
                                                              background: range === opt.value ? 'var(--accent)' : 'var(--bg-primary)',
                                                              color: range === opt.value ? 'white' : 'var(--text-secondary)',
                                                              border: '1px solid ' + (range === opt.value ? 'var(--accent)' : 'var(--border)'),
                                            }}
                                          >
                              {opt.label}
                            </button>button>
                          ))}
                      </div>div>
              </div>div>
        
          {/* Filters toggle */}
              <div className="px-5 pb-4">
                      <button
                                  onClick={() => setShowFilters(!showFilters)}
                                  className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                                  style={{ color: showFilters ? 'var(--accent)' : 'var(--text-secondary)' }}
                                >
                                <ChevronDown
                                              size={16}
                                              className={'transition-transform duration-200 ' + (showFilters ? 'rotate-180' : '')}
                                            />
                        {showFilters ? 'フィルターを閉じる' : 'ジャンル・予算でフィルター'}
                      </button>button>
              
                {showFilters && (
                          <div className="mt-3 grid grid-cols-2 gap-3 animate-fade-in">
                                      <div>
                                                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>ジャンル</label>label>
                                                    <div className="relative">
                                                                    <select
                                                                                        value={genre}
                                                                                        onChange={(e) => setGenre(e.target.value)}
                                                                                        className="input-base py-2.5 text-xs appearance-none pr-8"
                                                                                      >
                                                                      {GENRE_OPTIONS.map(g => (
                                                                                                            <option key={g.code} value={g.code}>{g.name}</option>option>
                                                                                                          ))}
                                                                    </select>select>
                                                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-secondary)' }} />
                                                    </div>div>
                                      </div>div>
                                      <div>
                                                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>予算</label>label>
                                                    <div className="relative">
                                                                    <select
                                                                                        value={budget}
                                                                                        onChange={(e) => setBudget(e.target.value)}
                                                                                        className="input-base py-2.5 text-xs appearance-none pr-8"
                                                                                      >
                                                                      {BUDGET_OPTIONS.map(b => (
                                                                                                            <option key={b.code} value={b.code}>{b.name}</option>option>
                                                                                                          ))}
                                                                    </select>select>
                                                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-secondary)' }} />
                                                    </div>div>
                                      </div>div>
                          </div>div>
                      )}
              </div>div>
        
          {/* Form error */}
          {formError && (
                        <div className="mx-5 mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}>
                          {formError}
                        </div>div>
              )}
        
          {/* Search button */}
              <div className="px-5 pb-5">
                      <button
                                  onClick={() => handleSearch()}
                                  className="w-full btn-primary py-3.5 text-sm"
                                >
                                <Search size={16} />
                                レストランを探す
                      </button>button>
              </div>div>
        
          {/* Search history */}
          {history.length > 0 && (
                        <div className="border-t px-5 py-4" style={{ borderColor: 'var(--border)' }}>
                                  <div className="flex items-center justify-between mb-3">
                                              <div className="flex items-center gap-1.5">
                                                            <Clock size={13} style={{ color: 'var(--text-secondary)' }} />
                                                            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>最近の検索</span>span>
                                              </div>div>
                                              <button
                                                              onClick={clearHistory}
                                                              className="text-xs transition-colors duration-200"
                                                              style={{ color: 'var(--text-secondary)' }}
                                                            >
                                                            クリア
                                              </button>button>
                                  </div>div>
                                  <div className="flex flex-wrap gap-2">
                                    {history.map((item, i) => (
                                        <button
                                                          key={i}
                                                          onClick={() => handleHistoryClick(item)}
                                                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 hover:scale-105"
                                                          style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                                                        >
                                                        <Clock size={11} />
                                          {item.label}
                                        </button>button>
                                      ))}
                                  </div>div>
                        </div>div>
              )}
        </div>div>
      )
}</div>
