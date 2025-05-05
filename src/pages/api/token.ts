import type { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  const { room, identity, role } = req.query;

  if (!room || !identity || !role) {
    return res.status(400).json({ error: 'Missing room, identity, or role' });
  }

  const apiKey = process.env.LIVEKIT_API_KEY!;
  const apiSecret = process.env.LIVEKIT_API_SECRET!;

  const at = new AccessToken(apiKey, apiSecret, {
    identity: identity as string,
  });

  if (role === 'publisher') {
    at.addGrant({ roomJoin: true, room: room as string, canPublish: true, canSubscribe: true });
  } else if (role === 'subscriber') {
    at.addGrant({ roomJoin: true, room: room as string, canSubscribe: true });
  } else {
    return res.status(400).json({ error: 'Invalid role' });
  }

  const token = await at.toJwt();
  res.status(200).json({ token });
}
