import { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { room, identity } = req.query;

    if (!room || !identity || typeof room !== 'string' || typeof identity !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid room or identity' });
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    // ✅ Debug log
    console.log('🔐 API KEY:', apiKey);
    console.log('🔐 API SECRET:', apiSecret ? '✔️ Loaded' : '❌ Missing');
    console.log('🏠 Room:', room);
    console.log('🙋 Identity:', identity);

    if (!apiKey || !apiSecret) {
      return res.status(500).json({ error: 'Missing LiveKit API credentials' });
    }

    const token = new AccessToken(apiKey, apiSecret, {
      identity,
    });

    token.addGrant({ roomJoin: true, room });

    const jwt = await token.toJwtAsync();

    return res.status(200).json({ token: jwt });
  } catch (error) {
    console.error('❌ Token creation failed:', error);
    return res.status(500).json({ error: 'Token creation failed' });
  }
}
