import { Room } from 'livekit-client'

export async function connectToRoom(url: string, token: string) {
  const room = new Room()
  await room.connect(url, token)
  console.log('Connected to room:', room.name)
  return room
}
// File: lib/livekitServer.ts
import { AccessToken } from 'livekit-server-sdk';

export function createToken({
  room,
  identity,
  role,
}: {
  room: string;
  identity: string;
  role: 'publisher' | 'subscriber';
}) {
  const apiKey = process.env.LIVEKIT_API_KEY || '';
  const apiSecret = process.env.LIVEKIT_API_SECRET || '';

  const token = new AccessToken(apiKey, apiSecret, {
    identity,
  });

  if (role === 'publisher') {
    token.addGrant({
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      room,
    });
  } else {
    token.addGrant({
      roomJoin: true,
      canSubscribe: true,
      room,
    });
  }

  return token.toJwt();
}
