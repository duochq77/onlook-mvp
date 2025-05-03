import React from 'react';
import { LiveKitRoom, ParticipantTile, GridLayout, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import '@livekit/components-styles';

interface ViewerPageProps {
  token: string;
  room: string;
}

export default function ViewerPage({ token, room }: ViewerPageProps) {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.Microphone, withPlaceholder: true },
  ]);

  if (!token) return <p>❌ Thiếu token người xem</p>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.VITE_LIVEKIT_URL}
      connect={true}
      video={true}
      audio={true}
      onConnected={() => {
        console.log('👀 Viewer đã kết nối phòng');
      }}
    >
      <h2>🎥 Đang xem livestream phòng: {room}</h2>
      <GridLayout tracks={tracks}>
        {tracks.map(({ publication, participant }, index) =>
          publication ? (
            <ParticipantTile
              key={index}
              publication={publication}
              participant={participant}
            />
          ) : null
        )}
      </GridLayout>
    </LiveKitRoom>
  );
}
