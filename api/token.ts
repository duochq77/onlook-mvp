import { AccessToken } from 'livekit-server-sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { room, identity } = req.query;

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!room || !identity || !apiKey || !apiSecret) {
      console.error('❌ Missing room, identity, or env variables');
      return res.status(500).json({ error: 'Missing parameters or configuration' });
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity: String(identity),
      ttl: 3600,
    });

    at.addGrant({
      roomJoin: true,
      room: String(room),
      canPublish: String(identity).startsWith('seller'),
      canSubscribe: true,
    });

    const jwt = at.toJwt();

    console.log('✅ Token generated for:', identity);
    return res.status(200).json({ token: jwt });
  } catch (err: any) {
    console.error('❌ Server error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
