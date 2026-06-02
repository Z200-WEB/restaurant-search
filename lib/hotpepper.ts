import type { SearchParams, SearchResult, Shop } from '@/types/hotpepper'

const API_BASE = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/'

function buildQuery(params: Record<string, string | number | undefined>): string {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value))
    }
  })
  query.set('format', 'json')
  return query.toString()
}

// Called from API route handlers only - keeps the API key server-side
export async function searchRestaurants(params: SearchParams): Promise<SearchResult> {
  const apiKey = process.env.HOTPEPPER_API_KEY
  if (!apiKey) throw new Error('HOTPEPPER_API_KEY is not set')

  const query = buildQuery({ ...params, key: apiKey } as any)
  const res = await fetch(`${API_BASE}?${query}`, { cache: 'no-store' })

  if (!res.ok) throw new Error(`API request failed: ${res.status}`)

  const data = await res.json()

  if (data.results?.error) {
    throw new Error(data.results.error[0]?.message || 'API error')
  }

  return data
}

// Fetch a single restaurant by ID
export async function getRestaurantById(id: string): Promise<Shop | null> {
  const apiKey = process.env.HOTPEPPER_API_KEY
  if (!apiKey) throw new Error('HOTPEPPER_API_KEY is not set')

  const query = buildQuery({ key: apiKey, id, count: 1, format: 'json' })
  const res = await fetch(`${API_BASE}?${query}`, { cache: 'no-store' })

  if (!res.ok) throw new Error(`API request failed: ${res.status}`)

  const data: SearchResult = await res.json()
  if (data.results?.error) return null

  return data.results?.shop?.[0] ?? null
}
