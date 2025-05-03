// src/pages/SellerPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { LiveKitRoom, VideoTrack, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { getToken } from '../services/api';

const SellerPage: React.FC = () => {
  const location = useLocation();
  const room = location.pathname.split('/').pop() || 'default-room';
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    getToken(room, 'seller', 'publisher').then(setToken);
  }, [room]);

  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]);

  if (!token) return <div>🔐 Đang lấy token...</div>;

  return (
    <LiveKitRoom token={token} serverUrl={process.env.LIVEKIT_URL} connect={true}>
      <h2>🎥 Đang phát livestream tại phòng: {room}</h2>
      {tracks.map((trackRef) =>
        trackRef.publication?.track ? (
          <VideoTrack key={trackRef.publication.trackSid} trackRef={trackRef} />
        ) : null
      )}
    </LiveKitRoom>
  );
};

export default SellerPage;
