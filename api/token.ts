// api/token.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { room, identity, role } = req.query;

    // Kiểm tra các tham số
    if (!room || !identity || !role) {
      return res.status(400).json({ error: 'Missing room, identity, or role' });
    }

    // Logic để tạo token (ví dụ: sử dụng LiveKit hoặc một công cụ tạo token)
    const token = generateToken(room, identity, role); // Giả sử bạn có hàm generateToken

    // Trả về token
    res.status(200).json({ token });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function generateToken(room: string | string[], identity: string | string[], role: string | string[]) {
  // Giả sử đây là logic tạo token
  return 'sampleToken';
}
