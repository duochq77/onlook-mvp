// File: pages/api/endLivestream.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { room } = req.body;

  if (!room) {
    return res.status(400).json({ error: 'Missing room' });
  }

  console.log(`🔴 Livestream ended for room: ${room}`);
  res.status(200).json({ message: 'Livestream ended successfully' });
}
