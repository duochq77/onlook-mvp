import type { NextApiRequest, NextApiResponse } from 'next'
import { AccessToken } from 'livekit-server-sdk'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, identity, role } = req.query

  if (!room || !identity || !role) {
    return res.status(400).json({ error: 'Thiếu room, identity hoặc role' })
  }

  const apiKey = process.env.LIVEKIT_API_KEY || ''
  const apiSecret = process.env.LIVEKIT_API_SECRET || ''

  const at = new AccessToken(apiKey, apiSecret, {
    identity: identity as string
  })

  at.addGrant({ room: room as string, roomJoin: true, canPublish: role === 'publisher', canSubscribe: true })

  const token = at.toJwt()
  res.status(200).json({ token })
}
