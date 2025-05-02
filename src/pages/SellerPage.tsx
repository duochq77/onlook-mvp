import { LiveKitRoom } from '@livekit/components-react';

interface SellerPageProps {
  token: string;
  room: string;
}

function SellerPage({ token, room }: SellerPageProps) {
  console.log('📡 Người bán đã vào phòng:', room);
  console.log('🌐 Server URL:', process.env.LIVEKIT_URL);

  return (
    <div>
      <h1>✅ Đang chạy SellerPage</h1>

      <LiveKitRoom
        token={token}
        serverUrl={process.env.LIVEKIT_URL}
        connect
        video={true}
        audio={true}
      >
        <h2>📡 Livestream đang phát từ người bán...</h2>
      </LiveKitRoom>
    </div>
  );
}

export default SellerPage;
