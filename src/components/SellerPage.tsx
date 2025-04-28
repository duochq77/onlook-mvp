// src/components/SellerPage.tsx
import React, { useRef, useState } from 'react';
import { connectToSellerRoom } from '../services/LiveKitService';

const SellerPage = () => {
  const [roomName, setRoomName] = useState('onlook-demo');
  const [connecting, setConnecting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = async () => {
    try {
      setConnecting(true);
      const res = await fetch(`http://localhost:3001/get-seller-token?roomName=${roomName}`);
      const data = await res.json();
      const token = data.token;

      const room = await connectToSellerRoom(token);

      const localVideoTrackPublication = Array.from(room.localParticipant.videoTracks.values())[0];
      if (localVideoTrackPublication && videoRef.current) {
        localVideoTrackPublication.track?.attach(videoRef.current);
      }
    } catch (error) {
      console.error('Failed to connect seller room', error);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div>
      <h2>Trang người bán</h2>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Nhập tên Room"
      />
      <button onClick={handleStart} disabled={connecting}>
        {connecting ? 'Đang kết nối...' : 'Bắt đầu Livestream'}
      </button>
      <div>
        <video ref={videoRef} autoPlay muted style={{ width: '100%', maxHeight: '80vh' }} />
      </div>
    </div>
  );
};

export default SellerPage;
