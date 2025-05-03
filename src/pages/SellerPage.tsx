import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LiveKitRoom } from '@livekit/components-react';

const SellerPage: React.FC = () => {
  const { room } = useParams();
  const serverUrl = process.env.LIVEKIT_URL!;
  const token = sessionStorage.getItem('seller_token');

  useEffect(() => {
    console.log('Người bán đang phát livestream...');
  }, []);

  return (
    <LiveKitRoom
      token={token ?? ''}
      serverUrl={serverUrl}
      connect={true}
      video={true}
      audio={true}
    >
      <div className="seller-stream">
        <h2>Đang phát livestream tại phòng: {room}</h2>
      </div>
    </LiveKitRoom>
  );
};

export default SellerPage;
