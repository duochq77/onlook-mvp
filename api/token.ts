import { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, identity } = req.query;

  if (!room || !identity) {
    return res.status(400).json({ error: '❌ Thiếu room hoặc identity' });
  }

  const identityStr = identity as string;
  const isSeller = identityStr.startsWith('seller-');

  const apiKey = process.env.LIVEKIT_API_KEY!;
  const apiSecret = process.env.LIVEKIT_API_SECRET!;

  const token = new AccessToken(apiKey, apiSecret, {
    identity: identityStr,
    ttl: 60 * 60, // 1 giờ
  });

  token.addGrant({
    room: room as string,
    roomJoin: true,
    canPublish: isSeller,   // ✅ chỉ seller được phát
    canSubscribe: true,     // ✅ cả 2 đều xem/nghe được
  });

  res.status(200).json({ token: token.toJwt() });
}
