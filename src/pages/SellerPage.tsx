import React, { useState } from 'react';
import { Room } from 'livekit-client';

interface Props {
  token: string;
  room: string;
}

export default function SellerPage({ token, room }: Props) {
  const [started, setStarted] = useState(false);
  const [livekitRoom, setLivekitRoom] = useState<Room | null>(null);

  const startLivestream = async () => {
    try {
      const roomInstance = new Room();

      await roomInstance.connect(process.env.LIVEKIT_URL!, token);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      for (const track of stream.getTracks()) {
        await roomInstance.localParticipant.publishTrack(track);
      }

      setLivekitRoom(roomInstance);
      setStarted(true);

      console.log('📡 Người bán đã bắt đầu phát phòng:', room);
    } catch (err) {
      console.error('❌ Lỗi kết nối hoặc phát:', err);
    }
  };

  return (
    <div className="p-4">
      {!started ? (
        <button
          onClick={startLivestream}
          className="bg-blue-600 text-white px-6 py-3 rounded text-lg"
        >
          🎥 Bắt đầu phát livestream
        </button>
      ) : (
        <p className="text-green-600 text-xl font-bold">
          🔴 Đang phát livestream tại phòng: {room}
        </p>
      )}
    </div>
  );
}
