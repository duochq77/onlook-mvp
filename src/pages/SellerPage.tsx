import { useEffect, useState } from 'react';
import { LiveKitRoom } from '@livekit/components-react';

export default function SellerPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch('https://onlook-token-server.onrender.com/api/seller-token?room=a');
      const data = await res.json();
      setToken(data.token);
    };

    fetchToken();
  }, []);

  if (!token) {
    return <div>Đang lấy token phát livestream...</div>;
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl="wss://onlook-dev-zvm78p9y.livekit.cloud"
      connect
      video
      audio
    >
      <h2>Đang phát livestream</h2>
    </LiveKitRoom>
  );
}
