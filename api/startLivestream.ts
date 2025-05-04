import { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';

const apiKey = process.env.LIVEKIT_API_KEY!;
const apiSecret = process.env.LIVEKIT_API_SECRET!;
const livekitHost = process.env.LIVEKIT_HOST!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, sellerId } = req.body;

  if (!room || !sellerId) {
    return res.status(400).json({ error: 'Missing room or sellerId' });
  }

  try {
    const at = new AccessToken(apiKey, apiSecret, {
      identity: sellerId,
      ttl: 60 * 60,
    });

    at.addGrant({
      room: room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });

    const token = await at.toJwt();
    res.status(200).json({ message: 'Livestream started', token });
  } catch (error: unknown) {
    // Định nghĩa kiểu cho error
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
