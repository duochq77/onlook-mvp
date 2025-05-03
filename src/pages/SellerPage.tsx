// src/pages/SellerPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LiveKitRoom } from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import VideoUploadRelay from '../components/VideoUploadRelay';

const SellerPage: React.FC = () => {
  const { room } = useParams<{ room: string }>();
  const [token, setToken] = useState<string | null>(null);
  const [isRelay, setIsRelay] = useState(false);
  const identity = `seller-${room}`;
  const serverUrl = process.env.VITE_LIVEKIT_URL || '';

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch(`/api/token?room=${room}&identity=${identity}&role=publisher`);
        const data = await res.json();
        setToken(data.token);
      } catch (error) {
        console.error('Failed to fetch token', error);
      }
    };
    fetchToken();
  }, [room]);

  if (!token) return <div>Đang lấy token phát video...</div>;

  return (
    <div style={{ height: '100vh' }}>
      {!isRelay ? (
        <LiveKitRoom
          token={token}
          serverUrl={serverUrl}
          connect={true}
          video={true}
          audio={true}
          onConnected={() => console.log('Connected to room')}
        >
          <button onClick={() => setIsRelay(true)}>Chuyển sang phát lại video</button>
        </LiveKitRoom>
      ) : (
        <VideoUploadRelay roomName={room!} identity={identity} token={token} serverUrl={serverUrl} />
      )}
    </div>
  );
};

export default SellerPage;
