import { NextApiRequest, NextApiResponse } from 'next'
import { AccessToken } from 'livekit-server-sdk'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, identity, role } = req.query

  if (!room || !identity || !role) {
    return res.status(400).json({ error: 'Missing room, identity, or role' })
  }

  const apiKey = process.env.LIVEKIT_API_KEY
  const apiSecret = process.env.LIVEKIT_API_SECRET

  if (!apiKey || !apiSecret) {
    return res.status(500).json({ error: 'LiveKit credentials not configured' })
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: identity as string,
  })

  at.addGrant({
    room: room as string,
    roomJoin: true,
    canPublish: role === 'publisher',
    canSubscribe: role === 'subscriber',
  })

  const token = await at.toJwt()
  return res.status(200).json({ token })
}
