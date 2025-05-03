import { AccessToken } from 'livekit-server-sdk';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.onlookmarket.live');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { room, identity, role } = req.query;

  if (!room || !identity || !role) {
    return res.status(400).json({ error: 'Thiếu room, identity hoặc role' });
  }

  const apiKey = process.env.LIVEKIT_API_KEY!;
  const apiSecret = process.env.LIVEKIT_API_SECRET!;

  const token = new AccessToken(apiKey, apiSecret, {
    identity: identity || uuidv4(),
  });

  if (role === 'publisher') {
    token.addGrant({ roomJoin: true, room, canPublish: true, canSubscribe: true });
  } else {
    token.addGrant({ roomJoin: true, room, canSubscribe: true });
  }

  const jwt = await token.toJwt();
  res.status(200).json({ token: jwt });
}
