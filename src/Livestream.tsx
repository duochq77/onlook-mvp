// src/Livestream.tsx
import { useEffect, useRef } from 'react';
import { Room, createLocalVideoTrack } from 'livekit-client';

const LIVEKIT_URL = process.env.VITE_LIVEKIT_URL || 'wss://onlook-dev-zvm78p9y.livekit.cloud';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDU4NjA1NzUsImlzcyI6IkFQSUxYQTc1cG5nY0FGVCIsIm5iZiI6MTc0NTg1OTY3NSwic3ViIjoidGVzdC1zZWxsZXIiLCJ2aWRlbyI6eyJjYW5VcGRhdGVPd25NZXRhZGF0YSI6dHJ1ZSwicm9vbSI6InNieC0ycmlsbGgtUW9tbkh6RHZpQ3JLZjZYOEREVko5NCIsInJvb21Kb2luIjp0cnVlLCJyb29tTGlzdCI6dHJ1ZX19.o_TEnoNQkcbvcg9iMOik2B1wfdpg1-qRBVIJB4PwwAE'; // Token

export default function Livestream() {
  const roomRef = useRef<Room>();

  useEffect(() => {
    const startLivekit = async () => {
      const room = new Room({}); // ✅ bắt buộc có {}

      await room.connect(LIVEKIT_URL, TOKEN);
      roomRef.current = room;

      const videoTrack = await createLocalVideoTrack({}); // ✅ cũng phải có {}

      const videoElement = videoTrack.attach();
      document.getElementById('video-container')?.appendChild(videoElement);

      room.on('disconnected', () => {
        console.log('Disconnected from LiveKit');
      });
    };

    startLivekit();

    return () => {
      roomRef.current?.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Livestream Test</h2>
      <div id="video-container" />
    </div>
  );
}
