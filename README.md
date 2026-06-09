# 🍽️ SAR YA AUNG — レストラン検索アプリ

> **SAR YA AUNG**（サーヤーアウン）はミャンマー語で「**食べましょう**」という意味。  
> 今いる場所から、今すぐ食べたいお店をすぐに見つける — シンプルで速い日常使いのグルメ検索アプリ。

🌐 **ライブデモ**: [restaurant-search-sooty.vercel.app](https://restaurant-search-sooty.vercel.app/)  
📁 **リポジトリ**: [github.com/Z200-WEB/restaurant-search](https://github.com/Z200-WEB/restaurant-search)

---

## 📸 スクリーンショット

| ホーム | 検索結果 | 店舗詳細 |
|--------|---------|---------|
| HDスライドショー背景 + 検索フォーム | グリッド / マップビュー切替 | 営業時間・アクセス・Google Maps連携 |

---

## ✨ 主な機能

- 📍 **現在地で検索** — Geolocation APIで周辺のレストランを即検索
- 🔍 **キーワード・ジャンル・予算フィルター** — 細かい条件で絞り込み
- 🔥 **今すぐ開いてる店** — 現在営業中の店舗のみ表示
- 📄 **ページネーション** — 全件をスムーズに閲覧
- 🗺️ **グリッド / マップ切替** — 一覧表示と地図表示を切り替え
- 🏪 **店舗詳細** — 住所・営業時間・定休日・予算・Google Maps連携
- ❤️ **お気に入り** — localStorageに保存（ログイン不要）
- 🌙 **ダーク / ライトモード** — テーマ切替対応
- ⚡ **スケルトンローディング** — 読み込み中の表示

---

## 🛠️ 技術スタック

| 技術 | 用途 |
|------|------|
| Next.js 14 (App Router) | フレームワーク |
| TypeScript 5 | 型安全な開発 |
| Tailwind CSS 3 | スタイリング（モバイルファースト） |
| Lucide React | アイコン |
| Noto Sans JP | 日本語フォント |
| Vercel | デプロイ |

---

## 🔐 アーキテクチャのポイント

**APIキーのサーバー側管理**  
Hot Pepper APIへのリクエストはすべてNext.jsのRoute Handlerを経由します。APIキーはサーバー側にのみ存在し、ブラウザに露出しません。

**URLによる状態管理**  
検索条件（キーワード・ジャンル・予算・ページ）をすべてURLクエリパラメータで管理。ブラウザの戻るボタンが正しく機能し、URLを共有すると同じ結果が再現されます。

---

## 🚀 開発環境の構築手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/Z200-WEB/restaurant-search.git
cd restaurant-search

# 2. 依存パッケージをインストール
npm install

# 3. 環境変数を設定
cp .env.local.example .env.local
# .env.local を編集して APIキーを追加
# HOTPEPPER_API_KEY=your_api_key_here

# 4. 開発サーバーを起動
npm run dev
# → http://localhost:3000
```

APIキーは [リクルートWebサービス](https://webservice.recruit.co.jp/) から無料で取得できます。

---

## 📁 プロジェクト構成

```
app/
├── layout.tsx              # ルートレイアウト
├── page.tsx                # ホーム画面
├── globals.css             # グローバルスタイル
├── api/
│   ├── search/route.ts     # GET /api/search
│   └── restaurant/[id]/    # GET /api/restaurant/:id
├── results/page.tsx        # 検索結果画面
├── restaurant/[id]/        # 店舗詳細画面
└── favorites/              # お気に入り画面
components/
├── SearchForm.tsx          # 検索フォーム
├── RestaurantCard.tsx      # 結果カード
├── Navbar.tsx              # ナビゲーション
└── Pagination.tsx          # ページネーション
```

---

*Powered by [ホットペッパー Webサービス](https://webservice.recruit.co.jp/)*
