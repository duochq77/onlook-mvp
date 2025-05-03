import {
  LiveKitRoom,
  useTracks,
  ParticipantTile,
  GridLayout,
} from '@livekit/components-react';
import { Track } from 'livekit-client';

interface ViewerPageProps {
  token: string;
  room: string;
}

function ViewerPage({ token, room }: ViewerPageProps) {
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.Microphone },
  ]);

  const filteredTracks = tracks.filter(
    (trackRef) =>
      trackRef.publication && trackRef.publication.track !== undefined
  );

  if (!serverUrl) {
    return <p>❌ Thiếu cấu hình LiveKit URL (NEXT_PUBLIC_LIVEKIT_URL)</p>;
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect
      video
      audio
      onConnected={() => {
        console.log(`👀 Viewer connected to room: ${room}`);
      }}
    >
      <h2>👀 Đang xem phòng: {room}</h2>
      <GridLayout tracks={filteredTracks}>
        {(trackRef) => <ParticipantTile trackRef={trackRef} />}
      </GridLayout>
    </LiveKitRoom>
  );
}

export default ViewerPage;
