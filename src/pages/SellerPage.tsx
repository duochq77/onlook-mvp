import { LiveKitRoom } from '@livekit/components-react';

interface SellerPageProps {
  token: string;
  room: string;
}

function SellerPage({ token, room }: SellerPageProps) {
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!serverUrl) {
    return <p>❌ Thiếu cấu hình LiveKit URL (NEXT_PUBLIC_LIVEKIT_URL)</p>;
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect
      video
      audio
      onConnected={() => {
        console.log(`📡 Người bán đã kết nối vào phòng: ${room}`);
      }}
    >
      <h2>🎥 Livestream từ người bán – Phòng: {room}</h2>
    </LiveKitRoom>
  );
}

export default SellerPage;
