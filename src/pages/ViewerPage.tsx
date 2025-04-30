import { LiveKitRoom } from '@livekit/components-react';
import { useEffect, useState } from 'react';

type Props = {
  token: string;
  room: string;
};

export default function ViewerPage({ token, room }: Props) {
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    const resumeAudio = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioStarted(true);
      } catch (err) {
        console.error('Không thể bật audio:', err);
      }
    };
    resumeAudio();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      {audioStarted && (
        <LiveKitRoom
          token={token}
          serverUrl={import.meta.env.VITE_LIVEKIT_URL}
          roomOptions={{ autoSubscribe: true }}
          connect
        >
          <h1>Đang xem livestream...</h1>
        </LiveKitRoom>
      )}
    </div>
  );
}
