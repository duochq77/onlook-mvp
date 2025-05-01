import { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, identity } = req.query;

  if (!room || !identity) {
    return res.status(400).json({ error: 'Missing room or identity' });
  }

  const at = new AccessToken(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!, {
    identity: identity as string,
  });
  at.addGrant({ room: room as string, roomJoin: true });

  const token = at.toJwt();
  res.json({ token });
}
