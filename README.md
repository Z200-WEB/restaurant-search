# 🍜 グルメサーチ - Restaurant Search App

A modern restaurant search app using the **Hot Pepper Gourmet API**.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons.
Clean Japanese-style minimal design, mobile-first.

---

## Features

- 📍 Geolocation search — find restaurants near your GPS location
- 🔍 Keyword + filter search — genre, budget, search radius
- 🃏 Restaurant cards — thumbnail, name, access, genre, budget
- 📄 Pagination — browse all results
- 🏪 Detail page — full info, business hours, feature tags
- 🗺️ Google Maps button — one-click open in Maps
- ❤️ Favorites — saved to localStorage (no login needed)
- ⚡ Skeleton loading + empty states

---

## Getting Started

```bash
git clone https://github.com/Z200-WEB/restaurant-search.git
cd restaurant-search
npm install
cp .env.local.example .env.local
# Add your Hot Pepper API key to .env.local
npm run dev
```

Get a free API key: https://webservice.recruit.co.jp/

---

## Project Structure

```
app/
  layout.tsx                   Root layout (header/footer)
  page.tsx                     Home search page
  globals.css                  Tailwind + custom CSS
  not-found.tsx                404 page
  api/search/route.ts          GET /api/search (proxies Hot Pepper)
  api/restaurant/[id]/route.ts GET /api/restaurant/:id
  results/page.tsx             Search results page
  restaurant/[id]/page.tsx     Restaurant detail page
components/
  SearchForm.tsx               Geolocation + filter search form
  RestaurantCard.tsx           Card in results grid
  Pagination.tsx               Page navigation
  FavoriteButton.tsx           localStorage heart button
  LoadingCard.tsx              Skeleton loading
  EmptyState.tsx               No-results UI
lib/
  hotpepper.ts                 API client (server-side only)
  constants.ts                 Genre, budget, radius options
  utils.ts                     cn() utility
hooks/
  useGeolocation.ts            Custom GPS hook
types/
  hotpepper.ts                 TypeScript interfaces
```

---

## Architecture Decisions

**API key stays server-side**
All Hot Pepper API calls go through Next.js Route Handlers. The key never reaches the browser.

**Server + Client Components**
Detail page = Server Component (data at render time). Results page = Client Component (reacts to URL params for pagination).

**localStorage for favorites**
No backend needed. useEffect reads localStorage only on the client to avoid SSR hydration mismatch.

**Custom useGeolocation hook**
Separates browser GPS API from UI. SearchForm stays clean.

---

## Interview Script

> This is a restaurant search app using the Hot Pepper Gourmet API. The home page lets users search by GPS or keyword. Searching navigates to /results which calls /api/search — a Route Handler that proxies Hot Pepper with our server-side key. Results show in a responsive card grid with pagination. Clicking a card opens /restaurant/:id, a Server Component that fetches detail at render time. The Favorite button saves to localStorage using useEffect to avoid hydration issues. GPS logic is in a custom hook. TypeScript interfaces mirror the API response shape exactly.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 App Router | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Noto Sans JP | Japanese font |

---

*Powered by ホットペッパー Webサービス*
