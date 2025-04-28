// src/services/LiveKitServiceViewer.ts
import { Room } from 'livekit-client';

const livekitUrl = process.env.VITE_LIVEKIT_URL; // ✅ Dùng process.env

export async function connectToViewerRoom(token: string): Promise<Room> {
  const room = new Room({
    adaptiveStream: true,
    dynacast: true,
  });
  await room.connect(livekitUrl!, token);

  return room;
}
