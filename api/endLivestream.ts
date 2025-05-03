// api/endLivestream.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Tạm thời không lưu DB, chỉ log kết thúc
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { room, sellerId } = req.body;

  if (!room || !sellerId) {
    return res.status(400).json({ error: 'Missing room or sellerId' });
  }

  // Giả định clear trạng thái livestream
  console.log(`[END] Livestream room: ${room} has ended by seller: ${sellerId}`);

  return res.status(200).json({ message: 'Livestream ended', room });
}
