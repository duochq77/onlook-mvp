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
      serverUrl="wss://onlook-dev-zvm78p9y.livekit.cloud"
      connect
      video
      audio
    >
      <h2>📡 Livestream đang phát từ người bán...</h2>
    </LiveKitRoom>
  );
}

export default SellerPage;
