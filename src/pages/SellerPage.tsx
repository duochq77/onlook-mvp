import { LiveKitRoom } from '@livekit/components-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Props = {
  token: string;
  room: string;
};

export default function SellerPage({ token, room }: Props) {
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
          <h1>Đang phát livestream...</h1>
        </LiveKitRoom>
      )}
    </div>
  );
}
