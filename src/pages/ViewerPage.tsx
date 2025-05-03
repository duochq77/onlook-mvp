import React from 'react';
import { LiveKitRoom, useTracks, TrackReference, VideoTrack, AudioTrack } from '@livekit/components-react';
import { Track } from 'livekit-client';

interface ViewerPageProps {
  token: string;
  room: string;
}

function TrackRenderer({ track }: { track: TrackReference }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      {track.source === Track.Source.Camera && <VideoTrack trackRef={track} />}
      {track.source === Track.Source.Microphone && <AudioTrack trackRef={track} />}
    </div>
  );
}

function ViewerRoomContent() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.Microphone, withPlaceholder: false },
  ]);

  return (
    <div>
      <h2>👀 Viewer is watching...</h2>
      {tracks.map((track) =>
        track && track.publication ? (
          <TrackRenderer key={track.publication.trackSid} track={track} />
        ) : null
      )}
    </div>
  );
}

export default function ViewerPage({ token, room }: ViewerPageProps) {
  if (!token) return <p>❌ Thiếu token</p>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.VITE_LIVEKIT_URL}
      connect={true}
      video
      audio
    >
      <ViewerRoomContent />
    </LiveKitRoom>
  );
}
