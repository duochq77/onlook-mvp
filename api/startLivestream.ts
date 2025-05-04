import { NextApiRequest, NextApiResponse } from 'next';
import generateToken from './generateToken.d';  // Import hàm generateToken

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { room, sellerId, videoType, productName } = req.body;

  if (!room || !sellerId) {
    return res.status(400).json({ error: 'Missing room or sellerId' });
  }

  try {
    // Gọi hàm generateToken để lấy token cho seller
    const { token } = await generateToken(room, `seller-${sellerId}`, 'publisher');
    console.log(`[START] Livestream room: ${room}, seller: ${sellerId}, videoType: ${videoType}, product: ${productName}`);
    return res.status(200).json({ message: 'Livestream started', token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
