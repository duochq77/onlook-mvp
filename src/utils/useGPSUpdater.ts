// src/utils/useGPSUpdater.ts

import { useEffect, useState } from 'react';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const useGPSUpdater = (): Coordinates | null => {
  const [coords, setCoords] = useState<Coordinates | null>(null);

  useEffect(() => {
    const updateLocation = () => {
      if (!navigator.geolocation) {
        console.warn('Geolocation is not supported by this browser.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true }
      );
    };

    updateLocation();
    const interval = setInterval(updateLocation, 60000); // cập nhật mỗi 60 giây

    return () => clearInterval(interval);
  }, []);

  return coords;
};
