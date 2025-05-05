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
      const roomName = 'a';
      const identity = 'viewer-' + Math.floor(Math.random() * 1000);
      const url = 'wss://onlook-dev-zvm78p9y.livekit.cloud';

      try {
        // ✅ Gọi GET token đơn giản, chuẩn
        const res = await fetch(`/api/token?room=${roomName}&identity=${identity}&role=subscriber`);
        const data = await res.json();

        if (!data.token) {
          console.error('❌ Không nhận được token');
          return;
        }

        const room = new Room();
        setRoom(room);

        room.on('trackSubscribed', (track: RemoteTrack, _, participant: RemoteParticipant) => {
          if (track.kind === 'video') {
            const videoTrack = track as RemoteVideoTrack;
            const element = videoRef.current;
            if (element) {
              videoTrack.attach(element);
              console.log('📺 Video đã được gắn vào viewer');
            }
          }
        });

        await room.connect(url, data.token);
        console.log('🟢 Viewer đã kết nối');
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
      <h1>Giao diện người xem</h1>
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
