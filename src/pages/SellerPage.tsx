import { LiveKitRoom } from '@livekit/components-react';

interface SellerPageProps {
  token: string;
  room: string;
}

function SellerPage({ token, room }: SellerPageProps) {
  if (!token) return <p>❌ Thiếu token</p>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.VITE_LIVEKIT_URL}
      connect
      video
      audio
      onConnected={() => {
        console.log(`📡 Người bán đã kết nối vào phòng: ${room}`);
      }}
    >
      <h2>🎥 Livestream từ người bán - Phòng: {room}</h2>
    </LiveKitRoom>
  );
}

export default SellerPage;
