import React from 'react';
import { LiveKitRoom, useTracks, GridLayout, TrackReferenceOrPlaceholder } from '@livekit/components-react';
import TrackTileRenderer from '../components/TrackTileRenderer';

interface ViewerPageProps {
  token: string;
  room: string;
}

function ViewerPage({ token, room }: ViewerPageProps) {
  const tracks = useTracks();

  const activeTracks = tracks.filter(
    (t) => t.publication?.track !== undefined
  );

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect
      video
      audio
      onConnected={() => {
        console.log(`👀 Viewer connected to room: ${room}`);
      }}
    >
      <h2>👀 Đang xem phòng: {room}</h2>
      <GridLayout tracks={activeTracks}>
        {(trackRef: TrackReferenceOrPlaceholder) => (
          <TrackTileRenderer trackRef={trackRef} />
        )}
      </GridLayout>
    </LiveKitRoom>
  );
}

export default ViewerPage;
