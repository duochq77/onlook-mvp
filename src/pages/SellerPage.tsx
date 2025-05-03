import React from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';

interface SellerPageProps {
  token: string;
  room: string;
}

const SellerPage: React.FC<SellerPageProps> = ({ token, room }) => {
  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.VITE_LIVEKIT_URL}
      connectOptions={{ autoSubscribe: false }}
      video={true}
      audio={true}
    >
      <h2>🔴 Đang phát livestream từ người bán</h2>
      <VideoConference />
    </LiveKitRoom>
  );
};

export default SellerPage;
