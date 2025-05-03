// api/token.ts
import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req: any, res: any) {
  const { room, identity, role } = req.query;

  if (!room || !identity || !role) {
    return res.status(400).json({ error: 'Thiếu room, identity hoặc role' });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  const at = new AccessToken(apiKey, apiSecret, { identity });

  at.addGrant({
    room,
    roomJoin: true,
    canPublish: role === 'publisher',
    canSubscribe: true,
  });

  const token = await at.toJwt();
  res.status(200).json({ token });
}
