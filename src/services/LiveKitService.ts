// src/services/LiveKitService.ts
import { Room, createLocalVideoTrack } from 'livekit-client';

const livekitUrl = process.env.VITE_LIVEKIT_URL; // ✅ Dùng process.env thay vì import.meta.env

export async function connectToSellerRoom(token: string): Promise<Room> {
  const room = new Room();
  await room.connect(livekitUrl!, token);

  const localTrack = await createLocalVideoTrack();
  await room.localParticipant.publishTrack(localTrack);

  return room;
}
