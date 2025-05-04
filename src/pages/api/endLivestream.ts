// File: /apps/frontend/api/endLivestream.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { room } = req.body || {};

  if (!room) {
    return res.status(400).json({ error: 'Missing room' });
  }

  try {
    console.log(`Livestream ended for room: ${room}`);
    // TODO: thêm xử lý thật ở đây nếu cần, ví dụ cập nhật trạng thái trong DB
    return res.status(200).json({ message: 'Livestream ended successfully' });
  } catch (error) {
    console.error('Error ending livestream:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
