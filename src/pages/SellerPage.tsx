import { LiveKitRoom } from '@livekit/components-react';

interface SellerPageProps {
  token: string;
  room: string;
}

function SellerPage({ token, room }: SellerPageProps) {
  console.log('📡 Người bán đã vào phòng:', room);

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.LIVEKIT_URL}
      connect
      video={true}
      audio={true}
    >
      <h2>📡 Livestream đang phát từ người bán...</h2>
      {/* Người bán không cần hiển thị video của chính mình */}
    </LiveKitRoom>
  );
}

export default SellerPage;
