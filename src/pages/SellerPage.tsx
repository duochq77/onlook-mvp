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

  return (
    <div style={{ height: '100vh' }}>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.VITE_LIVEKIT_URL}
        connect={true}
        video={true}
        audio={true}
      >
        <VideoConference />
        {/* ❌ Không nghe tiếng mình */}
      </LiveKitRoom>
    </div>
  );
}

export default SellerPage;
