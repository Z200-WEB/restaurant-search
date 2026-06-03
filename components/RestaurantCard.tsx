import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Utensils, Wallet } from 'lucide-react'
import type { Shop } from '@/types/hotpepper'

interface Props {
          shop: Shop
}

export default function RestaurantCard({ shop }: Props) {
          const rawUrl = shop.photo?.pc?.l || shop.photo?.pc?.m || shop.photo?.pc?.s || ''
          const imageUrl = rawUrl
            .replace('http://', 'https://')
            .replace(/_\d+(_s)?\.jpg$/i, '_480.jpg')
          const hasImage = imageUrl && !imageUrl.includes('noimage')

  return (
              <Link href={`/restaurant/${shop.id}`}>
                            <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group cursor-pointer">
                                    {/* Thumbnail */}
                                    <div className="relative h-44 bg-gray-100 overflow-hidden">
                                            {hasImage ? (
                                  <Image
                                                        src={imageUrl}
                                                        alt={shop.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                      />
                                ) : (
                                  <div className="h-full flex items-center justify-center text-gray-300">
                                                <Utensils size={40} />
                                  </div>
                                              )}
                                            {/* Genre badge */}
                                              <div className="absolute top-2 left-2">
                                                          <span className="bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 px-2 py-1 rounded-full shadow-sm">
                                                                  {shop.genre?.name}
                                                          </span>
                                              </div>
                                    </div>
                            
                                    {/* Info */}
                                    <div className="p-4">
                                              <h2 className="font-semibold text-gray-900 text-base leading-snug mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">
                                                      {shop.name}
                                              </h2>
                                    
                                            {shop.access && (
                                  <div className="flex items-start gap-1.5 mb-2">
                                                <MapPin size={12} className="text-gray-400 mt-0.5 shrink-0" />
                                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{shop.access}</p>
                                  </div>
                                              )}
                                    
                                            {shop.budget?.average && (
                                  <div className="flex items-center gap-1.5 mb-2">
                                                <Wallet size={12} className="text-gray-400 shrink-0" />
                                                <p className="text-xs text-gray-500">{shop.budget.average}</p>
                                  </div>
                                              )}
                                    
                                            {shop.catch && (
                                  <p className="text-xs text-orange-500 line-clamp-1 mt-1">{shop.catch}</p>
                                              )}
                                    </div>
                            </article>
              </Link>
            )
}</article>
