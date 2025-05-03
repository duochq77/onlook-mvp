import React from 'react';
import { LiveKitRoom, GridLayout, ParticipantTile } from '@livekit/components-react';
import '@livekit/components-styles';

interface ViewerPageProps {
  token: string;
  room: string;
}

const ViewerPage: React.FC<ViewerPageProps> = ({ token, room }) => {
  if (!token) return <p>❌ Thiếu token người xem</p>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.VITE_LIVEKIT_URL}
      connect
      video
      audio
    >
      <div className="p-4">
        <h2>👀 Đang theo dõi phòng: {room}</h2>
        <GridLayout tracks={[{ source: 'camera', withPlaceholder: true }]}>
          <ParticipantTile />
        </GridLayout>
      </div>
    </LiveKitRoom>
  );
};

export default ViewerPage;
