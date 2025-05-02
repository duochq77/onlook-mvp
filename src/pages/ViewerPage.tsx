import { LiveKitRoom, ParticipantTile, GridLayout } from '@livekit/components-react';

interface ViewerPageProps {
  token: string;
  room: string;
}

function ViewerPage({ token, room }: ViewerPageProps) {
  console.log('👀 Người xem đã vào phòng:', room);

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.LIVEKIT_URL}
      connect
      video={true}
      audio={true}
    >
      <h2>👀 Người xem đang theo dõi phòng: {room}</h2>
      <GridLayout tracks={[{ source: 'camera', withPlaceholder: true }]} >
        <ParticipantTile />
      </GridLayout>
    </LiveKitRoom>
  );
}

export default ViewerPage;
