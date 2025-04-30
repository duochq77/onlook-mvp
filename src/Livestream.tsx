import React from 'react';
import { LiveKitRoom } from '@livekit/components-react';

interface LivestreamProps {
  token: string;
  room: string;
}

const Livestream: React.FC<LivestreamProps> = ({ token, room }) => {
  return (
    <LiveKitRoom
      token={token}
      serverUrl={import.meta.env.VITE_LIVEKIT_URL}
      room={room}
      connect={true}
      video={true}
      audio={true}
      onError={(err) => {
        console.error('Lỗi khi kết nối LiveKit:', err);
      }}
      style={{ height: '100vh' }}
    >
      {/* Các thành phần bên trong phòng có thể thêm ở đây nếu muốn */}
    </LiveKitRoom>
  );
};

export default Livestream;
