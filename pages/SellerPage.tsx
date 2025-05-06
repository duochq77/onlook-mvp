import { useEffect, useState } from 'react';
import { useRoomContext, useTracks, VideoTrack, LiveKitRoom } from '@livekit/components-react';

export default function SellerPage() {
  const [token, setToken] = useState<string | null>(null);
  const roomName = 'onlook-room';
  const identity = 'seller-' + Math.floor(Math.random() * 1000);

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

  const tracks = useTracks(); // Lấy danh sách track trực tiếp từ hook useTracks

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL || ''}
      connect={true}
      video={true}
      audio={true}
    >
      <h2>Người bán đang livestream</h2>
      <div>
        {tracks.map((track, index) => (
          <VideoTrack key={index} trackRef={track} />
        ))}
      </div>

    </LiveKitRoom>
  );
}
