// src/pages/ViewerPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { LiveKitRoom, useTracks, VideoTrack } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { getToken } from '../services/api';

const ViewerContent: React.FC = () => {
  const tracks = useTracks([Track.Source.Camera]);

  return (
    <>
      {tracks.map((trackRef) =>
        trackRef.publication?.track ? (
          <VideoTrack key={trackRef.publication.trackSid} trackRef={trackRef} />
        ) : null
      )}
    </>
  );
};

const ViewerPage: React.FC = () => {
  const location = useLocation();
  const room = location.pathname.split('/').pop() || 'default-room';
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    getToken(room, 'viewer', 'subscriber').then(setToken);
  }, [room]);

  if (!token) return <div>🔓 Đang vào phòng xem livestream...</div>;

  return (
    <LiveKitRoom token={token} serverUrl={process.env.LIVEKIT_URL} connect={true}>
      <h2>👀 Đang xem livestream phòng: {room}</h2>
      <ViewerContent />
    </LiveKitRoom>
  );
};

export default ViewerPage;
