import type { NextApiRequest, NextApiResponse } from 'next'

const { AccessToken } = require('livekit-server-sdk')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const API_KEY = process.env.LIVEKIT_API_KEY
  const API_SECRET = process.env.LIVEKIT_API_SECRET

  if (!API_KEY || !API_SECRET) {
    console.error('❌ Thiếu LIVEKIT_API_KEY hoặc LIVEKIT_API_SECRET')
    return res.status(500).json({ error: 'Thiếu biến môi trường LIVEKIT' })
  }

  try {
    const { room = 'a' } = req.query
    const identity = 'seller-' + Math.random().toString(36).substring(2, 10)

    console.log('🟡 Tạo token cho:', identity)

    const at = new AccessToken(API_KEY, API_SECRET, {
      identity,
      name: identity,
    })

    at.addGrant({
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      room: String(room),
    })

    const token = at.toJwt()
    console.log('✅ Token tạo thành công:', token.slice(0, 20) + '...')

    return res.status(200).json({ token })
  } catch (err: any) {
    console.error('❌ Lỗi tạo token:', err?.message || err)
    return res.status(500).json({ error: 'Không tạo được token' })
  }
}
