import { LiveKitRoom } from '@livekit/components-react';
import { useEffect } from 'react';

type Props = {
  token: string;
  room: string;
};

function ViewerPage({ token, room }: Props) {
  useEffect(() => {
    console.log('Người xem đã vào phòng');
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <p>Giao diện người xem – Phòng: {room}</p>
      <LiveKitRoom
        token={token} // ✅ truyền đúng chuỗi token
        serverUrl={process.env.LIVEKIT_URL}
        connect={true}
      >
        <p>Đang xem livestream...</p>
      </LiveKitRoom>
    </div>
  );
}

export default ViewerPage;
