import { LiveKitRoom } from '@livekit/components-react';
import { useEffect } from 'react';
import { RoomEvent, Room } from 'livekit-client';

interface Props {
  token: string;
  room: string;
}

const SellerPage = ({ token, room }: Props) => {
  const serverUrl = process.env.VITE_LIVEKIT_URL;

  const onConnected = (room: Room) => {
    console.log('✅ Connected to LiveKit room');
    room.localParticipant.setCameraEnabled(true);
    room.localParticipant.setMicrophoneEnabled(true);
  };

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect={true}
      onConnected={onConnected}
    >
      <h2>Đây là phòng phát trực tiếp (Seller)</h2>
    </LiveKitRoom>
  );
};

export default SellerPage;
