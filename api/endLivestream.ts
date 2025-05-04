// api/endLivestream.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { room, sellerId } = req.body;

    // Kiểm tra tham số
    if (!room || !sellerId) {
      return res.status(400).json({ error: 'Missing required fields: room and sellerId' });
    }

    // TODO: Sau này có thể cập nhật trạng thái livestream là đã kết thúc trong DB
    console.log(`[END] Livestream ended`);
    console.log(`Room: ${room}`);
    console.log(`Seller ID: ${sellerId}`);

    // Trả về phản hồi thành công
    return res.status(200).json({
      message: 'Livestream ended successfully',
      room,
      sellerId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error ending livestream:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
