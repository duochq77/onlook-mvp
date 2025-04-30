import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { useEffect } from 'react';

type Props = {
  token: string;
  room: string;
};

function SellerPage({ token, room }: Props) {
  useEffect(() => {
    console.log('📡 Người bán đã vào phòng:', room);
  }, [room]);

  const serverUrl = process.env.VITE_LIVEKIT_URL;
  if (!serverUrl) {
    throw new Error('❌ Thiếu biến môi trường VITE_LIVEKIT_URL');
  }

  return (
    <div style={{ height: '100vh', backgroundColor: '#000' }}>
      <p style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>
        🔴 ĐANG LIVESTREAM – Phòng: <strong>{room}</strong>
      </p>
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect={true}
        video={true}
        audio={true}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
}

export default SellerPage;
