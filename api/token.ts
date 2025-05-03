import type { NextApiRequest, NextApiResponse } from 'next'

// ✅ Dùng require để tránh lỗi "Cannot use import statement outside a module"
const livekit = require('livekit-server-sdk')
const uuid = require('uuid')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, identity, role } = req.query

  if (!room || !identity || !role) {
    return res.status(400).json({ error: 'Missing room, identity, or role' })
  }

  try {
    const apiKey = process.env.LIVEKIT_API_KEY
    const apiSecret = process.env.LIVEKIT_API_SECRET

    if (!apiKey || !apiSecret) {
      console.error('LIVEKIT_API_KEY or LIVEKIT_API_SECRET is missing')
      return res.status(500).json({ error: 'Server config error' })
    }

    const token = new livekit.AccessToken(apiKey, apiSecret, {
      identity: identity as string || uuid.v4(),
    })

    token.addGrant({
      roomJoin: true,
      room: room as string,
      canPublish: role === 'publisher',
      canSubscribe: role === 'subscriber',
    })

    const jwt = await token.toJwt()
    res.status(200).json({ token: jwt })
  } catch (err: any) {
    console.error('Token generation failed:', err)
    res.status(500).json({ error: 'Token generation failed' })
  }
}
