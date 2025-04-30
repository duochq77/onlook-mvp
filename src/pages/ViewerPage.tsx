import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
  ParticipantTile,
  useTracks,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
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
        video={false}
        audio={false}
      >
        <StartAudio label="Bật âm thanh" />
        <RoomAudioRenderer />
        <ViewerVideoOnly />
      </LiveKitRoom>
    </div>
  );
}

// ✅ Sửa đúng API mới: dùng participant + publication
function ViewerVideoOnly() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPublisher: true },
  ]).filter((track) => !track.participant.isLocal);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
      {tracks.map((track) => (
        <ParticipantTile
          key={track.publication.trackSid}
          participant={track.participant}
          publication={track.publication}
        />
      ))}
    </div>
  );
}

export default ViewerPage;
