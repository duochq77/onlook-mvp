import { NextApiRequest, NextApiResponse } from 'next'
import { AccessToken } from 'livekit-server-sdk'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { room, identity, role } = req.query

    if (!room || !identity || !role) {
        return res.status(400).json({ error: 'Missing room, identity, or role' })
    }

    const apiKey = process.env.LIVEKIT_API_KEY || ''
    const apiSecret = process.env.LIVEKIT_API_SECRET || ''

    const token = new AccessToken(apiKey, apiSecret, {
        identity: identity as string,
    })

    if (role === 'publisher') {
        token.addGrant({
            room: room as string,
            roomJoin: true,
            canPublish: true,
            canSubscribe: true,
        })
    } else {
        token.addGrant({
            room: room as string,
            roomJoin: true,
            canSubscribe: true,
        })
    }

    const jwt = token.toJwt()
    res.status(200).json({ token: jwt })
}
