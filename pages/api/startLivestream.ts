// File: pages/api/startLivestream.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { room, identity } = req.body;

  if (!room || !identity) {
    return res.status(400).json({ error: 'Missing room or identity' });
  }

  console.log(`🎬 Livestream started for room: ${room}, by: ${identity}`);
  res.status(200).json({ message: 'Livestream started successfully' });
}
