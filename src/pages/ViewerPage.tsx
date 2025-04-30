import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
  ParticipantTile,
  useTracks,
  Track,
} from '@livekit/components-react';
import { useEffect } from 'react';

type Props = {
  token: string;
  room: string;
};

function ViewerPage({ token, room }: Props) {
  useEffect(() => {
    console.log('👀 Người xem đã vào phòng:', room);
  }, [room]);

  return (
    <div style={{ height: '100vh' }}>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.VITE_LIVEKIT_URL}
        connect={true}
        video={false} // ❌ Viewer không quay chính mình
        audio={false}
      >
        <StartAudio label="Bật âm thanh" />
        <RoomAudioRenderer /> {/* ✅ Để người xem nghe được người bán */}
        <ViewerVideoOnly />    {/* ✅ Hiển thị video của người bán */}
      </LiveKitRoom>
    </div>
  );
}

// 🎥 Chỉ hiển thị video của người khác (không phải chính mình)
function ViewerVideoOnly() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPublisher: true }
  ]).filter((track) => track.participant.isLocal === false);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
      {tracks.map(({ participant, publication }) => (
        <ParticipantTile
          key={participant.identity}
          participant={participant}
          publication={publication}
        />
      ))}
    </div>
  );
}

export default ViewerPage;
