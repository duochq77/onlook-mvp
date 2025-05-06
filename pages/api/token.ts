import type { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, identity, role } = req.query;

  if (!room || !identity || !role) {
    return res.status(400).json({ error: 'Thiếu room, identity hoặc role' });
  }

  const apiKey = process.env.LIVEKIT_API_KEY || '';
  const apiSecret = process.env.LIVEKIT_API_SECRET || '';
  const token = new AccessToken(apiKey, apiSecret, {
    identity: identity as string,
  });

  if (role === 'publisher') {
    token.addGrant({ roomJoin: true, canPublish: true, room: room as string });
  } else {
    token.addGrant({ roomJoin: true, canSubscribe: true, room: room as string });
  }

  const jwt = await token.toJwt();
  res.status(200).json({ token: jwt });
}
