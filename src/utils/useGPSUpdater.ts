import { useEffect } from 'react'

export const useGPSUpdater = (onUpdate: (coords: GeolocationCoordinates) => void) => {
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => onUpdate(pos.coords),
      (err) => console.warn('Lỗi GPS:', err),
      { enableHighAccuracy: true, maximumAge: 10000 }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [onUpdate])
}
