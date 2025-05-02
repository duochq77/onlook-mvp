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
      serverUrl="wss://onlook-dev-zvm78p9y.livekit.cloud"
      connect
      video
      audio
    >
      <h2>👀 Người xem đang theo dõi phòng: {room}</h2>
      <GridLayout tracks={[{ source: 'camera', withPlaceholder: true }]}>
        <ParticipantTile />
      </GridLayout>
    </LiveKitRoom>
  );
}

export default ViewerPage;
