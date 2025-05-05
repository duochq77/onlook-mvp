import React, { useRef } from 'react';
import { Room, createLocalVideoTrack } from 'livekit-client';

const SellerPage: React.FC = () => {
  const roomRef = useRef<Room | null>(null);

  const startLivestream = async () => {
    try {
      const roomName = 'a';
      const identity = 'seller-a';

      // Gọi API để xác nhận bắt đầu livestream
      const res = await fetch('/api/startLivestream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room: roomName, identity }),
      });

      const data = await res.json();
      console.log('✅ Start Livestream Response:', data);

      // Gọi token bằng GET
      const tokenRes = await fetch(
        `/api/token?room=${roomName}&identity=${identity}&role=publisher`
      );
      const tokenData = await tokenRes.json();

      if (!tokenData.token) {
        alert('❌ Không lấy được token');
        return;
      }

      const room = new Room();
      roomRef.current = room;

      await room.connect('wss://onlook-dev-zvm78p9y.livekit.cloud', tokenData.token);
      console.log('✅ Đã kết nối tới phòng!');

      const videoTrack = await createLocalVideoTrack();
      room.localParticipant.publishTrack(videoTrack);

      const videoElement = document.getElementById('local-video') as HTMLVideoElement;
      videoTrack.attach(videoElement);
    } catch (error) {
      console.error('❌ Lỗi khi bắt đầu livestream:', error);
      alert('❌ Lỗi khi bắt đầu livestream');
    }
  };

  const endLivestream = async () => {
    try {
      const res = await fetch('/api/endLivestream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room: 'a' }),
      });

      const data = await res.json();
      console.log('✅ End Livestream Response:', data);

      if (roomRef.current) {
        roomRef.current.disconnect();
        roomRef.current = null;
      }

      alert('🔴 Đã kết thúc livestream!');
    } catch (error) {
      console.error('❌ Lỗi khi kết thúc livestream:', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Trang người bán – Livestream</h1>
      <video
        id="local-video"
        autoPlay
        muted
        playsInline
        style={{ width: '100%', maxWidth: 600, border: '1px solid #ccc', borderRadius: 8 }}
      ></video>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={startLivestream}
          style={{ marginRight: 10, padding: '10px 20px' }}
        >
          ▶️ Bắt đầu Livestream
        </button>
        <button
          onClick={endLivestream}
          style={{ padding: '10px 20px' }}
        >
          ⏹️ Kết thúc Livestream
        </button>
      </div>
    </div>
  );
};

export default SellerPage;
