import { useEffect, useState } from 'react';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ParticipantTile,
  GridLayout,
  useTracks,
  TrackReferenceOrPlaceholder,
} from '@livekit/components-react';

export default function ViewerPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const resumeAudio = () => {
      if (typeof AudioContext !== 'undefined') {
        const ctx = new AudioContext();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
      }
    };
    window.addEventListener('click', resumeAudio);
    return () => window.removeEventListener('click', resumeAudio);
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch('https://onlook-token-server.onrender.com/api/viewer-token?room=a');
      const data = await res.json();
      setToken(data.token);
    };
    fetchToken();
  }, []);

  if (!token) return <div>Đang lấy token xem livestream...</div>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl="wss://onlook-dev-zvm78p9y.livekit.cloud"
      connect
      video
      audio
    >
      <div>
        <RoomAudioRenderer />
        <VideoGrid />
      </div>
    </LiveKitRoom>
  );
}

function VideoGrid() {
  const tracks = useTracks([{ source: 'camera', withPlaceholder: true }])
    .filter((track) => !track.participant.isLocal);

  return (
    <GridLayout tracks={tracks}>
      <div>
        {tracks.map((track: TrackReferenceOrPlaceholder) => (
          <ParticipantTile key={track.participant.sid} trackRef={track} />
        ))}
      </div>
    </GridLayout>
  );
}
