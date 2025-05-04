// api/endLivestream.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { room, sellerId } = req.body;

    if (!room || !sellerId) {
      return res.status(400).json({ error: 'Missing required fields: room and sellerId' });
    }

    console.log('[END] Livestream');
    console.log(`Room: ${room}`);
    console.log(`Seller ID: ${sellerId}`);

    return res.status(200).json({
      message: 'Livestream ended successfully',
      room,
      sellerId,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error in endLivestream:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
