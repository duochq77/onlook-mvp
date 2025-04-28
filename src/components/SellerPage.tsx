import { useEffect, useRef } from 'react';
import { Room, createLocalVideoTrack } from 'livekit-client';

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || 'wss://onlook-dev-zvm78p9y.livekit.cloud';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....'; // token

export default function SellerPage() {
  const roomRef = useRef<Room>();

  useEffect(() => {
    const start = async () => {
      const room = new Room({});
      await room.connect(LIVEKIT_URL, TOKEN);
      roomRef.current = room;

      const videoTrack = await createLocalVideoTrack({});
      const videoElement = videoTrack.attach();
      document.getElementById('local-video')?.appendChild(videoElement);

      room.on('disconnected', () => {
        console.log('Disconnected');
      });
    };

    start();

    return () => {
      roomRef.current?.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Seller Livestream</h2>
      <div id="local-video" />
    </div>
  );
}
