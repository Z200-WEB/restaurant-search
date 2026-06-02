import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Phone, ExternalLink, ArrowLeft, Utensils, Wallet, Train } from 'lucide-react'
import { getRestaurantById } from '@/lib/hotpepper'
import FavoriteButton from '@/components/FavoriteButton'

interface PageProps {
  params: { id: string }
}

// Server Component: fetches data at render time, no client loading state needed
export default async function RestaurantDetailPage({ params }: PageProps) {
  const shop = await getRestaurantById(params.id)
  if (!shop) notFound()

  const imageUrl = shop.photo?.pc?.l || shop.photo?.pc?.m || ''
  const hasImage = imageUrl && !imageUrl.includes('noimage')
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + shop.address)}`

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        検索に戻る
      </Link>

      {/* Hero image */}
      <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gray-100 mb-6">
        {hasImage ? (
          <Image
            src={imageUrl}
            alt={shop.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-300">
            <Utensils size={56} />
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-700 px-3 py-1.5 rounded-full shadow">
            {shop.genre?.name}
          </span>
        </div>
      </div>

      {/* Name and favorite */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{shop.name}</h1>
          {shop.genre?.catch && <p className="text-sm text-orange-500">{shop.genre.catch}</p>}
        </div>
        <FavoriteButton shopId={shop.id} shopName={shop.name} />
      </div>

      {/* Info */}
      <div className="space-y-3 mb-8">
        <InfoRow icon={<MapPin size={18} className="text-orange-400" />} label="住所">
          {shop.address}
        </InfoRow>

        {shop.access && (
          <InfoRow icon={<Train size={18} className="text-orange-400" />} label="アクセス">
            {shop.access}
          </InfoRow>
        )}

        {shop.open && (
          <InfoRow icon={<Clock size={18} className="text-orange-400" />} label="営業時間">
            <span className="whitespace-pre-line">{shop.open}</span>
            {shop.close && <span className="block text-xs text-gray-500 mt-1">定休日: {shop.close}</span>}
          </InfoRow>
        )}

        {shop.budget?.average && (
          <InfoRow icon={<Wallet size={18} className="text-orange-400" />} label="平均予算">
            {shop.budget.average}
            {shop.budget_memo && <span className="block text-xs text-gray-500 mt-0.5">{shop.budget_memo}</span>}
          </InfoRow>
        )}

        {shop.catch && (
          <InfoRow icon={<Phone size={18} className="text-orange-400" />} label="キャッチ">
            {shop.catch}
          </InfoRow>
        )}
      </div>

      {/* Feature tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {shop.wifi === 'あり' && <Tag label="WiFi" />}
        {shop.course === 'あり' && <Tag label="コース" />}
        {shop.free_drink === 'あり' && <Tag label="飲み放題" />}
        {shop.free_food === 'あり' && <Tag label="食べ放題" />}
        {shop.private_room === 'あり' && <Tag label="個室" />}
        {shop.parking === 'あり' && <Tag label="駐車場" />}
        {shop.non_smoking === 'あり' && <Tag label="禁煙" />}
        {shop.lunch === 'あり' && <Tag label="ランチ" />}
        {shop.midnight === '営業している' && <Tag label="深夜営業" />}
        {shop.english === 'あり' && <Tag label="英語メニュー" />}
        {shop.child === 'お子様連れ歓迎' && <Tag label="お子様OK" />}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-5 rounded-xl transition-colors"
        >
          <MapPin size={18} />
          Google マップで開く
          <ExternalLink size={14} />
        </a>

        {shop.urls?.pc && (
          <a
            href={shop.urls.pc}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-5 rounded-xl transition-colors"
          >
            ホットペッパーで見る
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  )
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <div className="text-sm text-gray-800">{children}</div>
      </div>
    </div>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs font-medium bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-1 rounded-full">
      {label}
    </span>
  )
}
