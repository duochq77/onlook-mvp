import { useEffect } from 'react';
import { supabase } from './authUtils';

export function useGPSUpdater() {
  useEffect(() => {
    const interval = setInterval(() => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(async (position) => {
        const user = await supabase.auth.getUser();
        if (!user.data.user) return;

        const { latitude, longitude } = position.coords;
        await supabase
          .from('users')
          .update({ lat: latitude, lng: longitude })
          .eq('id', user.data.user.id);
      });
    }, 60_000); // cập nhật mỗi phút

    return () => clearInterval(interval);
  }, []);
}
