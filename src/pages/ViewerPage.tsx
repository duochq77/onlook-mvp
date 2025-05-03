// src/pages/ViewerPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LiveKitRoom, VideoTrack, useTracks } from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';

const ViewerPage: React.FC = () => {
  const { room } = useParams<{ room: string }>();
  const [token, setToken] = useState<string | null>(null);
  const identity = `viewer-${room}`;
  const serverUrl = process.env.VITE_LIVEKIT_URL || '';

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch(`/api/token?room=${room}&identity=${identity}&role=subscriber`);
        const data = await res.json();
        setToken(data.token);
      } catch (err) {
        console.error('Error fetching token', err);
      }
    };
    fetchToken();
  }, [room]);

  const TrackRenderer = () => {
    const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone], { onlySubscribed: true });
    return (
      <>
        {tracks.map(({ publication, participant }, i) => (
          <VideoTrack key={i} trackRef={publication} />
        ))}
      </>
    );
  };

  if (!token) return <div>Đang tải video...</div>;

  return (
    <div style={{ height: '100vh' }}>
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect={true}
      >
        <TrackRenderer />
      </LiveKitRoom>
    </div>
  );
};

export default ViewerPage;
