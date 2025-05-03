import React from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import '@livekit/components-styles';

interface SellerPageProps {
  token: string;
  room: string;
}

export default function SellerPage({ token, room }: SellerPageProps) {
  if (!token) return <p>❌ Thiếu token người bán</p>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.VITE_LIVEKIT_URL}
      connect={true}
      video={true}
      audio={true}
      onConnected={() => {
        console.log('✅ Seller đã kết nối LiveKit');
      }}
    >
      <h2>📡 Phát livestream từ người bán: {room}</h2>
    </LiveKitRoom>
  );
}
