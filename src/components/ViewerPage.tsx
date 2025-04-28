import { useEffect, useRef } from 'react';
import { Room, RemoteTrack, RemoteTrackPublication, RemoteParticipant, RoomEvent } from 'livekit-client';

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || 'wss://onlook-dev-zvm78p9y.livekit.cloud';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....'; // Token của bạn

export default function ViewerPage() {
  const roomRef = useRef<Room>();

  useEffect(() => {
    const start = async () => {
      const room = new Room({});
      await room.connect(LIVEKIT_URL, TOKEN);
      roomRef.current = room;

      room.on(RoomEvent.TrackSubscribed, (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
        if (track.kind === 'video') {
          const videoElement = track.attach();
          document.getElementById('remote-video')?.appendChild(videoElement);
        }
      });

      room.on(RoomEvent.Disconnected, () => {
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
      <h2>Viewer Livestream</h2>
      <div id="remote-video" />
    </div>
  );
}
