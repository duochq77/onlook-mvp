import React, { useEffect, useState } from 'react';
import { connect, Room, createLocalVideoTrack } from 'livekit-client';

const SellerPage: React.FC = () => {
  const [room, setRoom] = useState<Room | null>(null);

  const startLivestream = async () => {
    const res = await fetch('/api/startLivestream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room: 'a', identity: 'seller-a' }),
    });

    const data = await res.json();
    console.log('Start Livestream Response:', data);

    // 🔑 Lấy token để phát video
    const tokenRes = await fetch(`/api/token?room=a&identity=seller-a&role=publisher`);
    const { token } = await tokenRes.json();

    const room = await connect(process.env.LIVEKIT_HOST!, token);
    setRoom(room);

    const videoTrack = await createLocalVideoTrack();
    room.localParticipant.publishTrack(videoTrack);

    const videoElement = document.getElementById('local-video') as HTMLVideoElement;
    videoTrack.attach(videoElement);

    alert('🟢 Đã bắt đầu phát video!');
  };

  const endLivestream = async () => {
    await fetch('/api/endLivestream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room: 'a' }),
    });

    room?.disconnect();
    setRoom(null);
    alert('🔴 Đã kết thúc livestream!');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Trang người bán – Livestream</h1>
      <video id="local-video" autoPlay muted playsInline width="480" height="360" />
      <br />
      <button onClick={startLivestream} style={{ marginRight: 10 }}>▶️ Bắt đầu Livestream</button>
      <button onClick={endLivestream}>⏹️ Kết thúc Livestream</button>
    </div>
  );
};

export default SellerPage;
