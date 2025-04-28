// src/components/ViewerPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { connectToViewerRoom } from '../services/LiveKitServiceViewer';
import { RemoteTrack } from 'livekit-client';

const ViewerPage = () => {
  const [roomName, setRoomName] = useState('onlook-demo');
  const [connecting, setConnecting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleJoin = async () => {
    try {
      setConnecting(true);
      const res = await fetch(`http://localhost:3001/get-viewer-token?roomName=${roomName}`);
      const data = await res.json();
      const token = data.token;

      const room = await connectToViewerRoom(token);

      room.on('trackSubscribed', (track: RemoteTrack) => {
        if (track.kind === 'video' && videoRef.current) {
          track.attach(videoRef.current);
        }
      });

    } catch (error) {
      console.error('Failed to connect viewer room', error);
    } finally {
      setConnecting(false);
    }
  };

  useEffect(() => {
    handleJoin();
  }, []);

  return (
    <div>
      <h2>Trang người xem</h2>
      <div>
        <video ref={videoRef} autoPlay muted style={{ width: '100%', maxHeight: '80vh' }} />
      </div>
    </div>
  );
};

export default ViewerPage;
