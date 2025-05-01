import React, { useState } from 'react';
import { LiveKitRoom } from '@livekit/components-react';

interface Props {
  token: string;
  room: string;
}

export default function ViewerPage({ token, room }: Props) {
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    setJoined(true);
    console.log('👀 Người xem đã vào phòng:', room);
  };

  return (
    <div className="p-6 text-center">
      {!joined ? (
        <button
          onClick={handleJoin}
          className="bg-green-600 text-white px-6 py-3 rounded text-lg"
        >
          ▶️ Xem livestream phòng: {room}
        </button>
      ) : (
        <LiveKitRoom
          token={token}
          serverUrl={process.env.LIVEKIT_URL}
          connect
          roomOptions={{
            videoCaptureDefaults: { resolution: { width: 640, height: 360 } },
            audioCaptureDefaults: { autoGainControl: true },
          }}
        >
          <p className="text-blue-600 text-xl font-bold">
            🔵 Đang xem livestream...
          </p>
        </LiveKitRoom>
      )}
    </div>
  );
}
