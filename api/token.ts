import type { NextApiRequest, NextApiResponse } from 'next'

// ✅ Dùng require thay vì import để tránh lỗi trên Vercel
const { AccessToken } = require('livekit-server-sdk')
const { v4: uuidv4 } = require('uuid')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, identity, role } = req.query

  if (!room || !identity || !role) {
    return res.status(400).json({ error: 'Missing room, identity, or role' })
  }

  try {
    const apiKey = process.env.LIVEKIT_API_KEY!
    const apiSecret = process.env.LIVEKIT_API_SECRET!

    const token = new AccessToken(apiKey, apiSecret, {
      identity: (identity as string) || uuidv4(),
    })

    token.addGrant({
      roomJoin: true,
      canPublish: role === 'publisher',
      canSubscribe: role === 'subscriber',
      room: room as string,
    })

    const jwt = await token.toJwt()
    return res.status(200).json({ token: jwt })
  } catch (err: any) {
    console.error('Token generation failed:', err)
    return res.status(500).json({ error: 'Token generation failed' })
  }
}
