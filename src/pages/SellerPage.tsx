import { LiveKitRoom } from '@livekit/components-react';
import { useEffect } from 'react';

interface SellerPageProps {
  token: string;
  room: string;
}

function SellerPage({ token, room }: SellerPageProps) {
  useEffect(() => {
    console.log('📡 Người bán đã vào phòng:', room);
  }, [room]);

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.VITE_LIVEKIT_URL}
      connect
      video={true}
      audio={true}
    >
      <h2>🎥 Seller đang livestream...</h2>
    </LiveKitRoom>
  );
}

export default SellerPage;
