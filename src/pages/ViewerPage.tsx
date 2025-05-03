import { useEffect, useRef, useState } from 'react';
import {
  LiveKitRoom,
  ParticipantTile,
  GridLayout,
  useTracks,
  TrackReferenceOrPlaceholder,
} from '@livekit/components-react';
import { RoomEvent, Track } from 'livekit-client';

interface ViewerPageProps {
  token: string;
  room: string;
}

function ViewerPage({ token, room }: ViewerPageProps) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioStarted = useRef(false);

  // Bắt sự kiện click đầu tiên để kích hoạt âm thanh
  useEffect(() => {
    const handleClick = () => {
      if (!audioStarted.current) {
        const ctx = new AudioContext();
        ctx.resume().then(() => {
          console.log('🔊 AudioContext resumed');
          setAudioEnabled(true);
        });
        audioStarted.current = true;
      }
    };

    window.addEventListener('click', handleClick, { once: true });
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.VITE_LIVEKIT_URL}
      connect
      video
      audio={audioEnabled}
    >
      <h2>👀 Đang xem livestream phòng: {room}</h2>
      <GridLayout tracks={useTracks([{ source: Track.Source.Camera }]).filter(Boolean)}>
        {(track: TrackReferenceOrPlaceholder) =>
          track.publication ? <ParticipantTile trackRef={track} /> : null
        }
      </GridLayout>
    </LiveKitRoom>
  );
}

export default ViewerPage;
