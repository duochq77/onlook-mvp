// File: /apps/frontend/api/startLivestream.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { room, identity } = req.body || {};

  if (!room || !identity) {
    return res.status(400).json({ error: 'Missing room or identity' });
  }

  try {
    console.log(`Livestream started for room: ${room}, by: ${identity}`);
    // TODO: thêm xử lý thật ở đây nếu cần, ví dụ lưu trạng thái vào Supabase
    return res.status(200).json({ message: 'Livestream started successfully' });
  } catch (error) {
    console.error('Error starting livestream:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
