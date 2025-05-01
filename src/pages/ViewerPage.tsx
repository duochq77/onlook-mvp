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
    console.log('👀 Người xem đã tham gia phòng:', room);
  };

  return (
    <div className="p-4">
      {!joined ? (
        <button
          onClick={handleJoin}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ▶️ Xem livestream phòng: {room}
        </button>
      ) : (
        <LiveKitRoom
          token={token}
          serverUrl={process.env.LIVEKIT_URL}
          roomOptions={{
            videoCaptureDefaults: { resolution: { width: 640, height: 360 } },
            audioCaptureDefaults: { autoGainControl: true },
          }}
          connect
        >
          <p className="text-blue-600">🔵 Đang xem livestream...</p>
        </LiveKitRoom>
      )}
    </div>
  );
}
