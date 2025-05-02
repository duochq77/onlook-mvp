import { LiveKitRoom } from '@livekit/components-react';
import { useEffect } from 'react';

interface ViewerPageProps {
  token: string;
  room: string;
}

function ViewerPage({ token, room }: ViewerPageProps) {
  useEffect(() => {
    console.log('👀 Người xem đã vào phòng:', room);
  }, [room]);

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.VITE_LIVEKIT_URL}
      connect
      video={true}
      audio={true} // Viewer vẫn được nhận audio
      onConnected={() => {
        // Hệ thống sẽ tự ngắt mic của viewer
        // Dù viewer không được cấp quyền publish từ token
        console.log('🔇 Viewer không có mic');
      }}
    >
      <h2>👁️ Viewer đang xem livestream...</h2>
    </LiveKitRoom>
  );
}

export default ViewerPage;
