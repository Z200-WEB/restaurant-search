// Static options used throughout the app
// These match Hot Pepper API codes exactly

export const RADIUS_OPTIONS = [
  { value: 1, label: '300m' },
  { value: 2, label: '500m' },
  { value: 3, label: '1km' },
  { value: 4, label: '2km' },
  { value: 5, label: '3km' },
]

export const GENRE_OPTIONS = [
  { code: '', name: 'すべてのジャンル' },
  { code: 'G001', name: '居酒屋' },
  { code: 'G002', name: 'ダイニングバー・バル' },
  { code: 'G003', name: '創作料理' },
  { code: 'G004', name: '和食' },
  { code: 'G005', name: '洋食' },
  { code: 'G006', name: 'イタリアン・フレンチ' },
  { code: 'G007', name: '中華' },
  { code: 'G008', name: '焼肉・ホルモン' },
  { code: 'G009', name: 'アジア・エスニック料理' },
  { code: 'G010', name: '各国料理' },
  { code: 'G012', name: 'バー・カクテル' },
  { code: 'G013', name: 'ラーメン' },
  { code: 'G016', name: 'カフェ・スイーツ' },
  { code: 'G017', name: 'その他グルメ' },
]

export const BUDGET_OPTIONS = [
  { code: '', name: 'すべての予算' },
  { code: 'B009', name: '〜1000円' },
  { code: 'B010', name: '1001〜1500円' },
  { code: 'B011', name: '1501〜2000円' },
  { code: 'B001', name: '2001〜3000円' },
  { code: 'B002', name: '3001〜4000円' },
  { code: 'B003', name: '4001〜5000円' },
  { code: 'B008', name: '5001〜7000円' },
  { code: 'B004', name: '7001〜10000円' },
  { code: 'B005', name: '10001〜15000円' },
]

export const RESULTS_PER_PAGE = 12
