import { Room } from 'livekit-client';

export async function connectToRoomViewer(token: string, serverUrl: string) {
  const room = new Room();
  await room.connect(serverUrl, token);
  return room;
}
