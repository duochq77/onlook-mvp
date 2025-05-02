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
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect
      video
      audio
    >
      <h2>📡 Livestream đang phát từ người bán...</h2>
    </LiveKitRoom>
  );
}

export default SellerPage;
