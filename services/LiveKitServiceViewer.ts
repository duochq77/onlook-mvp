// File: lib/livekitServerViewer.ts
import { AccessToken } from 'livekit-server-sdk';

export function createViewerToken(room: string, identity: string) {
  const apiKey = process.env.LIVEKIT_API_KEY || '';
  const apiSecret = process.env.LIVEKIT_API_SECRET || '';

  const token = new AccessToken(apiKey, apiSecret, {
    identity,
  });

  token.addGrant({
    roomJoin: true,
    canSubscribe: true,
    room,
  });

  return token.toJwt();
}
