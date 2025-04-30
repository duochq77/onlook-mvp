import { useEffect, useState } from 'react';
import { LiveKitRoom, RoomAudioRenderer, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';

export default function ViewerPage() {
  const [token, setToken] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch(`https://onlook-token-server.onrender.com/api/viewer-token?room=a`);
      const data = await res.json();
      setToken(data.token);
    };

    fetchToken();
  }, []);

  const handleStart = async () => {
    // ✅ Ép AudioContext resume trước khi vào room
    try {
      if (typeof AudioContext !== 'undefined') {
        const ctx = new AudioContext();
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }
      }
    } catch (e) {
      console.warn('Không thể resume AudioContext:', e);
    }

    setStarted(true);
  };

  if (!token) {
    return <div>Đang lấy token xem livestream...</div>;
  }

  if (!started) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>🎬 Nhấn để bắt đầu xem livestream</h2>
        <button onClick={handleStart}>Bắt đầu xem</button>
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl="wss://onlook-dev-zvm78p9y.livekit.cloud"
      connect
      video
      audio
      onConnected={(room) => {
        room.localParticipant.setMicrophoneEnabled(false); // ✅ Không bật mic bên Viewer
      }}
    >
      <>
        <RoomAudioRenderer />
        <VideoConference />
      </>
    </LiveKitRoom>
  );
}
