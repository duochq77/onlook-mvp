import { LiveKitRoom } from '@livekit/components-react';
import { Room } from 'livekit-client';

interface Props {
  token: string;
  room: string;
}

const ViewerPage = ({ token, room }: Props) => {
  const serverUrl = process.env.VITE_LIVEKIT_URL;

  const onConnected = (room: Room) => {
    console.log('👀 Viewer connected to room');
  };

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect={true}
      onConnected={onConnected}
    >
      <h2>Đây là phòng xem livestream (Viewer)</h2>
    </LiveKitRoom>
  );
};

export default ViewerPage;
