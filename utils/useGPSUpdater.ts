// File: utils/useGPSUpdater.ts

import { useEffect } from 'react';

export function useGPSUpdater(
  onUpdate: (coords: { latitude: number; longitude: number }) => void
) {
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onUpdate({ latitude, longitude });
      },
      (error) => {
        console.error('Lỗi định vị:', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [onUpdate]);
}
