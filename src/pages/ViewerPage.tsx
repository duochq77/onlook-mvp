import { LiveKitRoom } from '@livekit/components-react';
import { useEffect } from 'react';

interface Props {
  token: string;
  room: string;
}

export default function ViewerPage({ token, room }: Props) {
  const serverUrl = process.env.LIVEKIT_URL;

  useEffect(() => {
    console.log('👀 Người xem đã vào phòng:', room);
  }, [room]);

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect
      video={true}
      audio={true}
    >
      <div className="text-white text-center mt-10">🔴 Đang xem livestream...</div>
    </LiveKitRoom>
  );
}
