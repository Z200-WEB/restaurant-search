function LoadingCard() {
  return (
    <div
      className="overflow-hidden rounded-2xl animate-fade-in"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      {/* Image skeleton */}
      <div className="skeleton h-44 w-full rounded-none" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded-lg" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-full rounded-lg" />
          <div className="skeleton h-3 w-2/3 rounded-lg" />
        </div>
        <div className="skeleton h-3 w-1/2 rounded-lg" />
      </div>
    </div>
  )
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  )
}

export default LoadingCard
