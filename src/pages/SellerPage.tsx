import { LiveKitRoom } from '@livekit/components-react';
import { useState } from 'react';

interface SellerPageProps {
  token: string;
  room: string;
}

function SellerPage({ token, room }: SellerPageProps) {
  const [start, setStart] = useState(false);

  if (!token) return <p>❌ Thiếu token</p>;

  return (
    <div>
      {!start ? (
        <button onClick={() => setStart(true)} className="p-2 bg-blue-600 text-white rounded">
          🚀 Bắt đầu livestream
        </button>
      ) : (
        <LiveKitRoom
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          connect
          video
          audio
        >
          <h2>📡 Livestream đang phát từ người bán: {room}</h2>
        </LiveKitRoom>
      )}
    </div>
  );
}

export default SellerPage;
