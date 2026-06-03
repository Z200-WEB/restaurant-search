'use client'

import { useState, useCallback } from 'react'

interface GeolocationState {
  lat: number | null
  lng: number | null
  error: string | null
  loading: boolean
  permissionDenied: boolean
}

// Wraps the browser Geolocation API in a clean React hook
// Checks Permissions API first to detect already-blocked state
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    error: null,
    loading: false,
    permissionDenied: false,
  })

  const getLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'お使いのブラウザは位置情報をサポートしていません',
      }))
      return
    }

    // Check permission status first (if Permissions API is available)
    if (navigator.permissions) {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' })
        if (result.state === 'denied') {
          setState(prev => ({
            ...prev,
            error: '位置情報へのアクセスがブロックされています。ブラウザのアドレスバー横の🔒アイコンから位置情報を「許可」に変更してください。',
            permissionDenied: true,
          }))
          return
        }
      } catch {
        // Permissions API not supported, continue normally
      }
    }

    setState(prev => ({ ...prev, loading: true, error: null, permissionDenied: false }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
          loading: false,
          permissionDenied: false,
        })
      },
      (err) => {
        let message = '位置情報の取得に失敗しました'
        let denied = false
        if (err.code === err.PERMISSION_DENIED) {
          message = '位置情報へのアクセスがブロックされています。ブラウザのアドレスバー横の🔒アイコンから位置情報を「許可」に変更してください。'
          denied = true
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          message = '位置情報を取得できません'
        } else if (err.code === err.TIMEOUT) {
          message = '位置情報の取得がタイムアウトしました。再度お試しください。'
        }
        setState({ lat: null, lng: null, error: message, loading: false, permissionDenied: denied })
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }, [])

  return { ...state, getLocation }
}
