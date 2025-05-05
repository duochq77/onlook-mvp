import React, { useRef } from 'react';
import { Room, createLocalVideoTrack } from 'livekit-client';

const SellerPage: React.FC = () => {
  const roomRef = useRef<Room | null>(null);

  const startLivestream = async () => {
    try {
      const roomName = 'a';
      const identity = 'seller-a';

      // Gọi token (GET)
      const tokenRes = await fetch(`/api/token?room=${roomName}&identity=${identity}&role=publisher`);
      const tokenData = await tokenRes.json();

      if (!tokenData.token) {
        alert('❌ Không lấy được token');
        return;
      }

      // Kết nối tới phòng
      const room = new Room();
      roomRef.current = room;

      await room.connect('wss://onlook-dev-zvm78p9y.livekit.cloud', tokenData.token);
      console.log('✅ Seller đã kết nối tới phòng');

      // Lấy video và publish
      const videoTrack = await createLocalVideoTrack();
      room.localParticipant.publishTrack(videoTrack);

      const element = document.getElementById('local-video') as HTMLVideoElement;
      if (element) {
        videoTrack.attach(element);
      }
    } catch (error) {
      console.error('❌ Lỗi khi bắt đầu livestream:', error);
    }
  };

  const endLivestream = () => {
    if (roomRef.current) {
      roomRef.current.disconnect();
      roomRef.current = null;
      alert('🔴 Livestream đã kết thúc');
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
      />
      <div style={{ marginTop: 20 }}>
        <button onClick={startLivestream} style={{ marginRight: 10, padding: '10px 20px' }}>
          ▶️ Bắt đầu Livestream
        </button>
        <button onClick={endLivestream} style={{ padding: '10px 20px' }}>
          ⏹️ Kết thúc Livestream
        </button>
      </div>
    </div>
  );
};

export default SellerPage;
