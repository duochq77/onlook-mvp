import { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, identity } = req.query;

  if (!room || !identity || typeof room !== 'string' || typeof identity !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid room/identity' });
  }

  try {
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return res.status(500).json({ error: 'Missing LiveKit credentials' });
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity,
    });

    at.addGrant({ roomJoin: true, room });

    const jwt = await at.toJwtAsync();
    return res.status(200).json({ token: jwt });
  } catch (err) {
    console.error('❌ Token creation error:', err);
    return res.status(500).json({ error: 'Token creation failed' });
  }
}
