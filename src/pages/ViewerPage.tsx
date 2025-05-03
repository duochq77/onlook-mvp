// src/pages/ViewerPage.tsx
import React from 'react';
import { useTracks, TrackReferenceOrPlaceholder } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import TrackTileRenderer from '../components/TrackTileRenderer';

interface ViewerPageProps {
  token: string;
  room: string;
}

const ViewerPage: React.FC<ViewerPageProps> = ({ token, room }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.VITE_LIVEKIT_URL}
      connect={true}
      onDisconnected={() => console.log('🔌 Đã ngắt kết nối khỏi phòng')}
    >
      <h2>🎥 Đang xem livestream...</h2>
      <Tracks
        stageTracks
        sortTracks="publishTime"
        render={({ trackRef }: { trackRef: TrackReferenceOrPlaceholder }) => (
          <TrackTileRenderer trackRef={trackRef} />
        )}
      />
    </LiveKitRoom>
  );
};

export default ViewerPage;
