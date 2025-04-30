import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { useEffect } from 'react';

type Props = {
  token: string;
  room: string;
};

function ViewerPage({ token, room }: Props) {
  useEffect(() => {
    console.log('👀 Người xem đã vào phòng:', room);
  }, [room]);

  const serverUrl = process.env.VITE_LIVEKIT_URL;
  if (!serverUrl) {
    throw new Error('❌ Thiếu biến môi trường VITE_LIVEKIT_URL');
  }

  return (
    <div style={{ height: '100vh', backgroundColor: '#111' }}>
      <p style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>
        📺 ĐANG XEM LIVESTREAM – Phòng: <strong>{room}</strong>
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

export default ViewerPage;
