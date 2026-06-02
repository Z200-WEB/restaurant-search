import { NextRequest, NextResponse } from 'next/server'
import { searchRestaurants } from '@/lib/hotpepper'
import type { SearchParams } from '@/types/hotpepper'

// GET /api/search
// Proxies Hot Pepper API - keeps the API key server-side only
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const params: SearchParams = {
    lat: searchParams.get('lat') ? Number(searchParams.get('lat')) : undefined,
    lng: searchParams.get('lng') ? Number(searchParams.get('lng')) : undefined,
    range: searchParams.get('range') ? Number(searchParams.get('range')) : 3,
    keyword: searchParams.get('keyword') || undefined,
    genre: searchParams.get('genre') || undefined,
    budget: searchParams.get('budget') || undefined,
    start: searchParams.get('start') ? Number(searchParams.get('start')) : 1,
    count: 12,
  }

  if (!params.lat && !params.keyword) {
    return NextResponse.json(
      { error: '位置情報またはキーワードが必要です' },
      { status: 400 }
    )
  }

  try {
    const data = await searchRestaurants(params)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: '検索中にエラーが発生しました' }, { status: 500 })
  }
}
