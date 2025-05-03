import React from 'react';
import {
  LiveKitRoom,
  useTracks,
  ParticipantTile,
  GridLayout,
  TrackReference,
} from '@livekit/components-react';
import { Track } from 'livekit-client';

interface ViewerPageProps {
  token: string;
  room: string;
}

function ViewerPage({ token, room }: ViewerPageProps) {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.Microphone },
  ]);

  const filteredTracks = tracks.filter(
    (trackRef) => trackRef.publication && trackRef.publication.track !== undefined
  );

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.VITE_LIVEKIT_URL}
      connect
      video
      audio
      onConnected={() => {
        console.log(`👀 Viewer connected to room: ${room}`);
      }}
    >
      <h2>👀 Đang xem phòng: {room}</h2>
      <GridLayout tracks={filteredTracks}>
        {(trackRef: TrackReference) => <ParticipantTile trackRef={trackRef} />}
      </GridLayout>
    </LiveKitRoom>
  );
}

export default ViewerPage;
