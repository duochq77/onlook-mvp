import { NextApiRequest, NextApiResponse } from 'next'
import { AccessToken } from 'livekit-server-sdk'

const API_KEY = process.env.LIVEKIT_API_KEY!
const API_SECRET = process.env.LIVEKIT_API_SECRET!

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room = 'a' } = req.query
  const identity = 'seller-' + Math.random().toString(36).substring(2, 10)

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
  res.status(200).json({ token })
}
