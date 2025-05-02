import { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { room, identity, role } = req.query;

    if (
      !room ||
      !identity ||
      !role ||
      typeof room !== 'string' ||
      typeof identity !== 'string' ||
      typeof role !== 'string'
    ) {
      return res.status(400).json({ error: 'Missing or invalid room, identity, or role' });
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return res.status(500).json({ error: 'Missing LiveKit API credentials' });
    }

    const token = new AccessToken(apiKey, apiSecret, {
      identity,
    });

    token.addGrant({
      roomJoin: true,
      room,
      canPublish: role === 'publisher',
      canSubscribe: true,
    });

    const jwt = await token.toJwtAsync();

    return res.status(200).json({ token: jwt });
  } catch (error: any) {
    console.error('❌ Token creation failed:', error);
    return res.status(500).json({
      error: 'Token creation failed',
      message: error?.message || 'Unknown error',
    });
  }
}
