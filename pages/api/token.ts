import { NextApiRequest, NextApiResponse } from 'next'
import { AccessToken } from 'livekit-server-sdk'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { room, identity, role } = req.query

    if (!room || !identity || !role) {
        return res.status(400).json({ error: 'Missing room, identity, or role' })
    }

    const apiKey = process.env.LIVEKIT_API_KEY!
    const apiSecret = process.env.LIVEKIT_API_SECRET!
    const roomName = room as string
    const userIdentity = identity as string
    const userRole = role as string

    const token = new AccessToken(apiKey, apiSecret, {
        identity: userIdentity,
    })

    token.addGrant({
        room: roomName,
        roomJoin: true,
        canPublish: userRole === 'publisher',
        canSubscribe: true,
    })

    res.status(200).json({ token: token.toJwt() })
}
