// Types matching the Hot Pepper Gourmet API response

export interface Shop {
  id: string
  name: string
  logo_image: string
  name_kana: string
  address: string
  station_name: string
  lat: number
  lng: number
  genre: {
    code: string
    name: string
    catch: string
  }
  sub_genre?: {
    code: string
    name: string
  }
  budget: {
    code: string
    name: string
    average: string
  }
  budget_memo: string
  catch: string
  capacity: number
  access: string
  mobile_access: string
  urls: {
    pc: string
  }
  photo: {
    pc: {
      l: string
      m: string
      s: string
    }
    mobile: {
      l: string
      s: string
    }
  }
  open: string
  close: string
  wifi: string
  course: string
  free_drink: string
  free_food: string
  private_room: string
  parking: string
  non_smoking: string
  card: string
  lunch: string
  midnight: string
  english: string
  pet: string
  child: string
}

export interface SearchResult {
  results: {
    api_version: string
    results_available: number
    results_returned: string
    results_start: number
    shop: Shop[]
    error?: Array<{ message: string; code: number }>
  }
}

export interface SearchParams {
  lat?: number
  lng?: number
  range?: number
  keyword?: string
  genre?: string
  budget?: string
  start?: number
  count?: number
  id?: string
}
