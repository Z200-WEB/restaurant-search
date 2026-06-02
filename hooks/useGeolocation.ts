'use client'

import { useState, useCallback } from 'react'

interface GeolocationState {
  lat: number | null
  lng: number | null
  error: string | null
  loading: boolean
}

// Wraps the browser Geolocation API in a clean React hook
// Separated so SearchForm stays readable and this can be tested independently
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    error: null,
    loading: false,
  })

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'お使いのブラウザは位置情報をサポートしていません',
      }))
      return
    }

    setState(prev => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
          loading: false,
        })
      },
      (err) => {
        let message = '位置情報の取得に失敗しました'
        if (err.code === err.PERMISSION_DENIED) {
          message = '位置情報へのアクセスが拒否されました'
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          message = '位置情報を取得できません'
        } else if (err.code === err.TIMEOUT) {
          message = '位置情報の取得がタイムアウトしました'
        }
        setState({ lat: null, lng: null, error: message, loading: false })
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    )
  }, [])

  return { ...state, getLocation }
}
