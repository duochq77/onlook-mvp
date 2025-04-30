import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { useEffect } from 'react';

type Props = {
  token: string;
  room: string;
};

function SellerPage({ token, room }: Props) {
  useEffect(() => {
    console.log('Người bán đã vào phòng');
    console.log('Token:', token);
  }, []);

  return (
    <div style={{ height: '100vh', background: '#000' }}>
      <p style={{ color: 'white' }}>Giao diện người bán – Phòng: {room}</p>
      <LiveKitRoom
        token={token}
        serverUrl="wss://onlook-dev-zvm78p9y.livekit.cloud"
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
