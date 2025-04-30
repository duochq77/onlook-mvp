import { useEffect, useState } from 'react';
import { LiveKitRoom, RoomAudioRenderer, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';

export default function ViewerPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const url = `https://onlook-token-server.onrender.com/api/viewer-token?room=a`;
      const res = await fetch(url);
      const data = await res.json();
      setToken(data.token);
    };

    fetchToken();
  }, []);

  // ⚠️ Bắt buộc click mới phát được âm thanh
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

  if (!token) return <div>Đang lấy token xem livestream...</div>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl="wss://onlook-dev-zvm78p9y.livekit.cloud"
      connect
      video
      audio
    >
      <>
        <RoomAudioRenderer />
        <VideoConference />
      </>
    </LiveKitRoom>
  );
}
