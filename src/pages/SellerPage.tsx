import { useEffect, useState } from 'react';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ParticipantTile,
  GridLayout,
  useTracks,
  TrackReferenceOrPlaceholder,
} from '@livekit/components-react';

export default function SellerPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch('https://onlook-token-server.onrender.com/api/seller-token?room=a');
      const data = await res.json();
      setToken(data.token);
    };

    fetchToken();
  }, []);

  if (!token) return <div>Đang lấy token phát livestream...</div>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl="wss://onlook-dev-zvm78p9y.livekit.cloud"
      connect
      video
      audio
    >
      <div>
        <RoomAudioRenderer />
        <VideoGrid />
      </div>
    </LiveKitRoom>
  );
}

function VideoGrid() {
  const tracks = useTracks([
    { source: 'camera', withPlaceholder: true },
    { source: 'audio' },
  ]).filter(
    (track) => track.source !== 'audio' || !track.participant.isLocal // chặn tiếng dội lại của chính mình
  );

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
