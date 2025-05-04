import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { room, identity } = req.body;

  if (!room || !identity) {
    res.status(400).json({ error: 'Missing room or identity' });
    return;
  }

  console.log(`🎬 Livestream started: room=${room}, identity=${identity}`);
  res.status(200).json({ message: 'Livestream started successfully' });
}
