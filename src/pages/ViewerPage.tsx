import { LiveKitRoom, RoomAudioRenderer, StartAudio, VideoConference } from '@livekit/components-react';
import { useEffect } from 'react';

type Props = {
  token: string;
  room: string;
};

function ViewerPage({ token, room }: Props) {
  useEffect(() => {
    console.log('👀 Người xem đã vào phòng:', room);
  }, [room]);

  return (
    <div style={{ height: '100vh' }}>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.VITE_LIVEKIT_URL}
        connect={true}
        video={false}
        audio={false}
      >
        <StartAudio />
        <RoomAudioRenderer /> {/* ✅ Giúp nghe được người bán */}
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
}

export default ViewerPage;
