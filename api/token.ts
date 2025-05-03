import type { NextApiRequest, NextApiResponse } from 'next'
import { AccessToken } from 'livekit-server-sdk'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, identity, role } = req.query

  if (!room || !identity || !role) {
    return res.status(400).json({ error: 'Missing room, identity, or role' })
  }

  try {
    const apiKey = process.env.LIVEKIT_API_KEY!
    const apiSecret = process.env.LIVEKIT_API_SECRET!

    const token = new AccessToken(apiKey, apiSecret, {
      identity: identity as string || uuidv4(),
    })

    token.addGrant({
      roomJoin: true,
      room: room as string,
      canPublish: role === 'publisher',
      canSubscribe: role === 'subscriber',
    })

    const jwt = await token.toJwt()
    res.status(200).json({ token: jwt })
  } catch (err) {
    console.error('Token generation failed:', err)
    res.status(500).json({ error: 'Token generation failed' })
  }
}
