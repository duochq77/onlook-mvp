// File: pages/SellerPage.tsx
import { useEffect, useState } from 'react';
import { Room, RoomEvent, VideoPresets, createLocalVideoTrack } from 'livekit-client';
import { LiveKitRoom, ControlBar, useRoomContext, useTracks, VideoTrack } from '@livekit/components-react';

const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || '';
const identity = 'seller-' + Math.floor(Math.random() * 1000);
const roomName = 'onlook-room';

function LiveVideo() {
  const room = useRoomContext();
  const tracks = useTracks([{ source: 'camera', withPlaceholder: false }]);

  return (
    <>
      {tracks.map(track => (
        <VideoTrack key={track.participant.identity} participant={track.participant} source={track.source} />
      ))}
    </>
  );
}

export default function SellerPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const url = `/api/token?room=${roomName}&identity=${identity}&role=publisher`;
      const res = await fetch(url);
      const data = await res.json();
      setToken(data.token);
    };
    fetchToken();
  }, []);

  if (!token) {
    return <p>Đang lấy token livestream...</p>;
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect={true}
      video={true}
      audio={true}
      onConnected={(room: Room) => {
        console.log(`Đã kết nối tới phòng ${room.name} với tư cách ${room.localParticipant.identity}`);
      }}
    >
      <h2>Người bán đang livestream</h2>
      <LiveVideo />
      <ControlBar />
    </LiveKitRoom>
  );
}
