import { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, identity } = req.query;

  if (!room || !identity || typeof room !== 'string' || typeof identity !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid room or identity' });
  }

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity,
    }
  );

  // Phân quyền theo loại người dùng
  if (identity.startsWith('seller-')) {
    token.addGrant({
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });
  } else if (identity.startsWith('viewer-')) {
    token.addGrant({
      room,
      roomJoin: true,
      canPublish: false, // viewer không được phép phát audio/mic
      canSubscribe: true,
    });
  } else {
    return res.status(403).json({ error: 'Invalid identity prefix' });
  }

  res.json({ token: token.toJwt() });
}
