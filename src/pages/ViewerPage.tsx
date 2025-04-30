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
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    try {
      // Bắt buộc người dùng click → AudioContext được phép chạy
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (ctx.state === 'suspended') {
        await ctx.resume();
        console.log('🔊 AudioContext resumed!');
      }
    } catch (err) {
      console.warn('❌ Resume AudioContext failed:', err);
    }

    try {
      const res = await fetch('https://onlook-token-server.onrender.com/api/viewer-token?room=a');
      const data = await res.json();
      setToken(data.token);
      setStarted(true);
    } catch (err) {
      console.error('❌ Lỗi lấy token:', err);
    }
  };

  if (!started) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Xem livestream Onlook</h2>
        <p>Bấm nút bên dưới để bắt đầu nghe và xem</p>
        <button
          onClick={handleStart}
          style={{ padding: '1rem 2rem', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          ▶️ Bắt đầu xem
        </button>
      </div>
    );
  }

  if (!token) return <div>Đang lấy token xem livestream...</div>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl="wss://onlook-dev-zvm78p9y.livekit.cloud"
      connect
      video={false}
      audio={false}
    >
      <RoomAudioRenderer />
      <VideoGrid />
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
