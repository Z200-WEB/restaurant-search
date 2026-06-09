# 簡易仕様書

### 作者

ZAWE ZAW HTET

### アプリ名

SAR YA AUNG（サーヤーアウン）

#### コンセプト

SAR YA AUNG はミャンマー語で「食べましょう」という意味。今いる場所から、今すぐ食べたいお店をすぐに見つけられる、シンプルで速い日常使いのグルメ検索アプリ。

#### こだわったポイント

APIキーをブラウザに露出させないため、Hot Pepper Gourmet APIへのリクエストをすべてNext.jsのRoute Handler経由で処理するプロキシ構造を採用しました。また検索条件（キーワード・ジャンル・予算・検索半径・ページ番号）をすべてURLクエリパラメータで管理することで、ブラウザの戻るボタンが正しく機能し、URLをシェアしても同じ検索結果が再現できる設計にしました。

#### デザイン面でこだわったポイント

ホームページの背景に複数のHD料理写真を使ったクロスフェードスライドショーを実装し、開くだけで食欲が湧くような視覚的インパクトを意識しました。全体をダークテーマに統一しつつオレンジをアクセントカラーとして採用し、食べ物の温かみとスタイリッシュさを両立させました。TailwindCSSのレスポンシブクラス（grid-cols-1 → sm:grid-cols-2 → lg:grid-cols-3）を活用したモバイルファースト設計で、スマートフォンでの片手操作を意識したレイアウトにしています。

### 公開したアプリの URL

https://restaurant-search-sooty.vercel.app/

### 該当プロジェクトのリポジトリ URL

https://github.com/Z200-WEB/restaurant-search

## 開発環境

### 開発環境

- OS: Windows 11
- エディタ: VS Code
- デプロイ: Vercel

### 開発言語

TypeScript 5.x

### フレームワーク

- Next.js 14.x（App Router）
- Tailwind CSS 3.x
- Lucide React（アイコン）

### 利用技術の選定理由

**Next.js** を採用した最大の理由は、サーバーサイドのRoute HandlerでAPIキーを安全に管理できる点です。フロントエンドからHot Pepper APIを直接叩くとAPIキーがブラウザに露出してしまいますが、Next.jsのプロキシ構造でキーを完全にサーバー側に隔離できます。またServer ComponentとClient Componentを柔軟に使い分けられる点も選定理由です。

**TypeScript** はHot Pepper APIのレスポンス構造が複雑なため、型定義によるバグ防止と開発効率向上を目的として採用しました。

**Tailwind CSS** はコンポーネントとスタイルを同一ファイルで管理でき、モバイルファーストのレスポンシブ対応を直感的に実装できるため採用しました。

### テーブル定義（ER図）などの設計ドキュメント

本アプリはデータベースを使用していません。お気に入り機能はブラウザのlocalStorageに保存しています。Hot Pepper Gourmet APIのレスポンス型定義は `types/hotpepper.ts` に記載しています。

### 開発環境構築手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/Z200-WEB/restaurant-search.git
cd restaurant-search

# 2. 依存パッケージをインストール
npm install

# 3. 環境変数ファイルを作成
cp .env.local.example .env.local
# .env.local を編集して Hot Pepper API キーを設定
# HOTPEPPER_API_KEY=your_api_key_here

# 4. 開発サーバーを起動
npm run dev
# → http://localhost:3000 で起動
```

APIキーは https://webservice.recruit.co.jp/ から無料で取得できます。

## 動作対象端末・OS

### 動作対象OS・ブラウザ

| OS | ブラウザ |
|-----|---------|
| Windows 11 | Google Chrome 最新版 |
| macOS 14 | Google Chrome 最新版 / Safari 最新版 |
| iOS 17 | Safari 最新版 |
| Android 14 | Google Chrome 最新版 |

## 開発期間

9日間

## アプリケーション機能

### 機能一覧

- **レストラン検索（キーワード）**：店名・エリア・料理ジャンルのキーワードでHot Pepper Gourmet APIを使って検索する。
- **現在地検索（GPS）**：Geolocation APIで現在地の緯度・経度を取得し、周辺のレストランを検索する。
- **今すぐ開いてるお店の検索**：現在営業中の店舗のみをフィルタリングして検索する（open=1パラメータ）。
- **検索半径の指定**：300m / 500m / 1km / 2km / 3km から検索範囲を選択できる。
- **ジャンル・予算フィルター**：ジャンルと予算帯を絞り込んで検索できる。
- **検索結果一覧表示**：グリッド形式でレストランカードを表示し、ページネーションで複数ページを閲覧できる。
- **マップビュー**：検索結果を地図上で確認できる。
- **店舗詳細表示**：店舗名・住所・アクセス・営業時間・定休日・予算・画像・キャッチコピーを表示する。
- **Google Maps連携**：詳細ページからGoogle Mapsを開いて経路を確認できる。
- **お気に入り保存**：localStorageを使ってお気に入りの店舗を保存・管理できる（ログイン不要）。
- **最近の検索履歴**：直近の検索キーワードをホームページに表示し、ワンタップで再検索できる。
- **ダークモード / ライトモード切替**：ユーザーの好みに合わせてテーマを切り替えられる。

### 画面一覧

- **ホーム画面（/）**：検索フォーム、GPS検索ボタン、今すぐ開いてる検索、お気に入りへのアクセス。
- **検索結果画面（/results）**：グリッド / マップビュー切替、ジャンルチップフィルター、ページネーション。
- **店舗詳細画面（/restaurant/[id]）**：店舗の詳細情報、Google Maps・ホットペッパー公式ページへのリンク。
- **お気に入り画面（/favorites）**：localStorageに保存したお気に入り店舗の一覧。

### 使用しているAPI・ライブラリ

- Hot Pepper Gourmet API（リクルートWebサービス）
- Next.js 14 / React 18
- TypeScript 5
- Tailwind CSS 3
- Lucide React（アイコン）
- Noto Sans JP（フォント）

## 自己評価

**7点 / 10点**

要件で求められた機能（検索条件入力・検索結果一覧・店舗詳細・ページネーション・Geolocation API）はすべて実装でき、セキュリティ（APIキーのサーバー側管理）やUX（URLによる状態管理・レスポンシブデザイン）にも配慮できた点を評価しています。

不足点として、テストコードが書けていないこと、一部店舗でサムネイル画像が表示されない（Hot Pepper API側で画像URLが返らないケースへの対応が不完全）、お気に入りがlocalStorage止まりでデバイス間同期に対応できていない点を考慮して7点としました。

## 技術面でアドバイスして欲しいポイント

- お気に入り機能をlocalStorageで実装しましたが、別のデバイスで同期できないことが課題です。実務レベルではどのように設計するか教えていただきたいです。

- テストコードを書く時間が取れなかったので、Next.js + TypeScriptのプロジェクトでのテストの書き方・どこから始めるべきかアドバイスをいただきたいです。

---

*Powered by [ホットペッパー Webサービス](https://webservice.recruit.co.jp/)*
