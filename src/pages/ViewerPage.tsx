import { useEffect, useState } from 'react';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ParticipantTile,
  GridLayout,
  useTracks,
  TrackReferenceOrPlaceholder,
} from '@livekit/components-react';
import '@livekit/components-styles';

export default function ViewerPage() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const handleClick = async () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (ctx.state === 'suspended') {
        await ctx.resume();
        console.log('🔊 AudioContext resumed');
      }
    } catch (err) {
      console.warn('❌ Failed to resume AudioContext', err);
    }

    const res = await fetch('https://onlook-token-server.onrender.com/api/viewer-token?room=a');
    const data = await res.json();
    setToken(data.token);
    setReady(true);
  };

  if (!ready) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>🎥 Xem Livestream</h2>
        <button onClick={handleClick} style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
          ▶️ Bắt đầu xem
        </button>
      </div>
    );
  }

  if (!token) {
    return <div>🔄 Đang lấy token...</div>;
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl="wss://onlook-dev-zvm78p9y.livekit.cloud"
      connect
      video={false}
      audio={true}
    >
      <RoomAudioRenderer />
      <VideoGrid />
    </LiveKitRoom>
  );
}

function VideoGrid() {
  const tracks = useTracks([{ source: 'camera', withPlaceholder: true }]).filter(
    (t) => !t.participant.isLocal
  );

  return (
    <GridLayout tracks={tracks}>
      {tracks.map((track: TrackReferenceOrPlaceholder) => (
        <ParticipantTile key={track.participant.sid} trackRef={track} />
      ))}
    </GridLayout>
  );
}
