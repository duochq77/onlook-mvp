// generateToken.ts
import { AccessToken } from 'livekit-server-sdk';

const apiKey = process.env.LIVEKIT_API_KEY!;
const apiSecret = process.env.LIVEKIT_API_SECRET!;
const livekitHost = process.env.LIVEKIT_HOST!;  // Bạn cần dùng biến này ở đâu đó nếu cần

export default function generateToken(room: string, identity: string, role: string) {
  const at = new AccessToken(apiKey, apiSecret, {
    identity: identity,
    ttl: 60 * 60,
  });

  at.addGrant({
    room: room,
    roomJoin: true,
    canPublish: role === 'publisher',
    canSubscribe: true,
  });

  return { token: at.toJwt(), livekitHost };  // Trả về livekitHost nếu cần
}
