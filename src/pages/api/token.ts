import type { NextApiRequest, NextApiResponse } from 'next';
const { AccessToken, VideoGrant } = require('livekit-server-sdk');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

    const grant: VideoGrant = {
      room,
      roomJoin: true,
      canPublish: role === 'publisher',
      canSubscribe: true,
    };

    const token = new AccessToken(apiKey, apiSecret, { identity });
    token.addGrant(grant);

    const jwt = token.toJwt();

    return res.status(200).json({ token: jwt });
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('❌ Token creation failed:', err);
    return res.status(500).json({
      error: 'Token creation failed',
      message: err.message || 'Unknown error',
    });
  }
}
