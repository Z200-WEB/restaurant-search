import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'グルメサーチ | レストラン検索',
  description: 'ホットペッパーグルメAPIを使ったレストラン検索アプリ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="min-h-screen bg-[#fafafa]">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🍜</span>
              <span className="font-bold text-gray-900 text-lg group-hover:text-orange-500 transition-colors">
                グルメサーチ
              </span>
            </a>
            <span className="text-xs text-gray-400 hidden sm:block">
              Powered by Hot Pepper Gourmet API
            </span>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-16 border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-400">
            <p>Powered by ホットペッパー Webサービス</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
