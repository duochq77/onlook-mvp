import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' })
  }

  // Xử lý logic khởi tạo phiên livestream
  res.status(200).json({ message: 'Livestream bắt đầu' })
}
