import type { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.onlookmarket.live');

  const { room, identity, role } = req.query;

  if (!room || !identity || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const token = new AccessToken(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!, {
    identity: identity as string,
  });

  token.addGrant({
    room: room as string,
    roomJoin: true,
    canPublish: role === 'publisher',
    canSubscribe: true,
  });

  res.json({ token: token.toJwt() });
}

