import SearchForm from '@/components/SearchForm'

// Home page - Server Component with hero section
// SearchForm handles all the client interaction
export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <div className="bg-gradient-to-b from-orange-50 to-white pt-16 pb-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
            <span>🔥</span>
            <span>Hot Pepper Gourmet</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            近くの
            <span className="text-orange-500">美味しい</span>
            お店を探す
          </h1>

          <p className="text-gray-500 text-lg mb-10">
            現在地から近いレストランを検索できます
          </p>

          <SearchForm />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '📍', title: '現在地から検索', desc: 'GPSを使って今いる場所の近くのお店を探せます' },
            { icon: '🔍', title: 'こだわり検索', desc: 'ジャンルや予算を絞って理想のお店を見つけましょう' },
            { icon: '❤️', title: 'お気に入り保存', desc: '気になるお店をブラウザに保存しておけます' },
          ].map((feature) => (
            <div key={feature.title} className="text-center p-6 rounded-2xl bg-white border border-gray-100">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
