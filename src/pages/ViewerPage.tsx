import React, { useEffect } from 'react';
import { LiveKitRoom, ParticipantTile, GridLayout } from '@livekit/components-react';

interface ViewerPageProps {
  token: string;
  room: string;
}

function ViewerPage({ token, room }: ViewerPageProps) {
  useEffect(() => {
    const tryResumeAudio = () => {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().then(() => {
          console.log('✅ AudioContext resumed silently.');
        });
      }
    };

    // Tự động resume sau 1 giây mà không cần thao tác người dùng
    setTimeout(tryResumeAudio, 1000);
  }, []);

  if (!token) return <p>❌ Thiếu token</p>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.VITE_LIVEKIT_URL}
      connect
      video
      audio
    >
      <h2>👀 Người xem đang theo dõi phòng: {room}</h2>
      <GridLayout tracks={[{ source: 'camera', withPlaceholder: true }]}>
        <ParticipantTile />
      </GridLayout>
    </LiveKitRoom>
  );
}

export default ViewerPage;
