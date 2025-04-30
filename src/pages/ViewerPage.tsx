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

  // ✅ Fix lỗi chặn âm thanh: resume AudioContext khi người dùng tương tác
  useEffect(() => {
    const resumeAudio = () => {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (ctx.state === 'suspended') {
          ctx.resume().then(() => {
            console.log('🔊 AudioContext resumed!');
          }).catch((err) => {
            console.warn('❌ Resume AudioContext failed:', err);
          });
        }
      } catch (err) {
        console.warn('⚠️ Không tạo được AudioContext:', err);
      }
    };

    window.addEventListener('click', resumeAudio);
    window.addEventListener('keydown', resumeAudio);
    setTimeout(resumeAudio, 2000); // tự động gọi lại sau 2s nếu cần

    return () => {
      window.removeEventListener('click', resumeAudio);
      window.removeEventListener('keydown', resumeAudio);
    };
  }, []);

  // ✅ Gọi API để lấy token xem
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
      video={false} // Viewer không gửi video
      audio={false} // Viewer không gửi mic
    >
      <RoomAudioRenderer /> {/* Nghe âm thanh từ seller */}
      <VideoGrid />
    </LiveKitRoom>
  );
}

function VideoGrid() {
  const tracks = useTracks([{ source: 'camera', withPlaceholder: true }])
    .filter((track) => !track.participant.isLocal); // Chỉ hiện video của người khác

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
