// Skeleton card for loading state - matches RestaurantCard shape
export default function LoadingCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="h-44 skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-4 skeleton rounded w-3/4" />
        <div className="space-y-1.5">
          <div className="h-3 skeleton rounded w-full" />
          <div className="h-3 skeleton rounded w-2/3" />
        </div>
        <div className="h-3 skeleton rounded w-1/2" />
      </div>
    </div>
  )
}

export function LoadingGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  )
}
