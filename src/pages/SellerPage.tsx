import { LiveKitRoom, StartAudio, StartMediaButton, VideoConference } from '@livekit/components-react';
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
        <StartAudio label="Bật âm thanh" />
        <StartMediaButton />
        <VideoConference />
        {/* ❌ Không nghe chính mình */}
      </LiveKitRoom>
    </div>
  );
}

export default SellerPage;
