// api/token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { room, identity, role } = req.query;

    if (!room || !identity || !role) {
      return res.status(400).json({ error: 'Missing room, identity, or role' });
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const roomName = Array.isArray(room) ? room[0] : room;
    const userIdentity = Array.isArray(identity) ? identity[0] : identity;
    const userRole = Array.isArray(role) ? role[0] : role;

    if (!apiKey || !apiSecret) {
      return res.status(500).json({ error: 'Missing LiveKit API credentials' });
    }

    try {
      const at = new AccessToken(apiKey, apiSecret, {
        identity: userIdentity,
      });

      at.addGrant({
        room: roomName,
        roomJoin: true,
        canPublish: userRole === 'publisher',
        canSubscribe: true,
      });

      const token = at.toJwt();
      return res.status(200).json({ token });
    } catch (err) {
      console.error('Token generation error:', err);
      return res.status(500).json({ error: 'Failed to generate token' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
