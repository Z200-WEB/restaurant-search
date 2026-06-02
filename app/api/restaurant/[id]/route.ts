import { NextRequest, NextResponse } from 'next/server'
import { getRestaurantById } from '@/lib/hotpepper'

// GET /api/restaurant/:id
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'IDが必要です' }, { status: 400 })
  }

  try {
    const shop = await getRestaurantById(id)

    if (!shop) {
      return NextResponse.json({ error: 'お店が見つかりませんでした' }, { status: 404 })
    }

    return NextResponse.json(shop)
  } catch (error) {
    console.error('Restaurant detail error:', error)
    return NextResponse.json({ error: 'データの取得に失敗しました' }, { status: 500 })
  }
}
