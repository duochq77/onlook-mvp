import { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, identity, role } = req.query;

  if (!room || !identity || !role) {
    return res.status(400).json({ error: 'Missing room, identity, or role' });
  }

  const at = new AccessToken(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!, {
    identity: identity as string,
    ttl: 60 * 60,
  });

  at.addGrant({
    room: room as string,
    roomJoin: true,
    canPublish: role === 'publisher',
    canSubscribe: true,
  });

  const token = await at.toJwt();
  res.status(200).json({ token });
}
