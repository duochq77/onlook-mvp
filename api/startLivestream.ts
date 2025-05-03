import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { room, sellerId, videoType, productName } = req.body;

  if (!room || !sellerId) {
    return res.status(400).json({ error: 'Missing room or sellerId' });
  }

  // Giả định lưu trạng thái livestream vào memory hoặc DB thật trong tương lai
  console.log(`[START] Livestream room: ${room}, seller: ${sellerId}, videoType: ${videoType}, product: ${productName}`);

  return res.status(200).json({ message: 'Livestream started', room });
}
