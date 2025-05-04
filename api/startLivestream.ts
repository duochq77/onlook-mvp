// api/startLivestream.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { room, sellerId } = req.body;
    
    // Kiểm tra và xử lý các tham số cần thiết
    if (!room || !sellerId) {
      return res.status(400).json({ error: 'Missing room or sellerId' });
    }

    // Logic bắt đầu livestream (ví dụ gọi API hoặc tạo phiên livestream)
    console.log(`Starting livestream for room: ${room} and sellerId: ${sellerId}`);

    // Trả về phản hồi thành công
    res.status(200).json({ message: 'Livestream started' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
