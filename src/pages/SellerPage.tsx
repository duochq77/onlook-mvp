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

      // ✅ Dòng này yêu cầu tương tác người dùng → sẽ không bị lỗi AudioContext
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      // ✅ Publish tất cả track (video + audio) từ thiết bị
      for (const track of stream.getTracks()) {
        await roomInstance.localParticipant.publishTrack(track);
      }

      setLivekitRoom(roomInstance);
      setStarted(true);
      console.log('📡 Người bán đã bắt đầu phát phòng:', room);
    } catch (error) {
      console.error('❌ Lỗi livestream:', error);
    }
  };

  return (
    <div className="p-6 text-center">
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
