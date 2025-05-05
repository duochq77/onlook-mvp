// src/pages/ViewerPage.tsx

import React, { useEffect, useRef, useState } from 'react';
import {
  Room,
  RemoteParticipant,
  RemoteTrack,
  RemoteVideoTrack,
} from 'livekit-client';

const ViewerPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    const connectToRoom = async () => {
      const url =
        process.env.VITE_LIVEKIT_URL || 'wss://onlook-dev-zvm78p9y.livekit.cloud';
      const identity = 'viewer-' + Math.floor(Math.random() * 1000);
      const roomName = 'a';

      try {
        const tokenRes = await fetch(
          `/api/token?room=${roomName}&identity=${identity}&role=subscriber`
        );

        const { token } = await tokenRes.json();
        console.log('[Viewer] Nhận token:', token);

        const room = new Room();

        room.on('trackSubscribed', (track: RemoteTrack, pub, participant: RemoteParticipant) => {
          if (track.kind === 'video') {
            const videoTrack = track as RemoteVideoTrack;
            const element = videoRef.current;
            if (element) {
              videoTrack.attach(element);
              console.log('📺 Viewer đã nhận video từ seller');
            }
          }
        });

        await room.connect(url, token);
        console.log('🟢 Viewer đã kết nối tới phòng:', roomName);
        setRoom(room);
      } catch (err) {
        console.error('❌ Viewer lỗi khi kết nối:', err);
      }
    };

    connectToRoom();

    return () => {
      room?.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Giao diện người xem – Phòng: a</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '100%', border: '2px solid black' }}
      />
    </div>
  );
};

export default ViewerPage;
