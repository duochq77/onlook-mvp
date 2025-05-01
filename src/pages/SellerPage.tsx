import React, { useEffect, useState } from 'react';
import { LiveKitRoom, useLocalParticipant } from '@livekit/components-react';
import { Room } from 'livekit-client';

interface Props {
  token: string;
  room: string;
}

export default function SellerPage({ token, room }: Props) {
  const [started, setStarted] = useState(false);
  const [livekitRoom, setLivekitRoom] = useState<Room | null>(null);

  const startLivestream = async () => {
    const { Room } = await import('livekit-client');
    const newRoom = new Room();

    await newRoom.connect(process.env.LIVEKIT_URL!, token);

    const tracks = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    for (const track of tracks.getTracks()) {
      await newRoom.localParticipant.publishTrack(track);
    }

    setLivekitRoom(newRoom);
    setStarted(true);

    console.log('📡 Người bán đã bắt đầu phát phòng:', room);
  };

  return (
    <div className="p-4">
      {!started ? (
        <button
          onClick={startLivestream}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          🎥 Bắt đầu phát livestream
        </button>
      ) : (
        <p className="text-green-600">🔴 Đang livestream phòng: {room}</p>
      )}
    </div>
  );
}
