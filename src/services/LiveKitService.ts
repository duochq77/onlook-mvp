import { connect } from 'livekit-client'

export async function connectToRoom(): Promise<any> {
    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || ''
    const roomName = 'default-room'
    const identity = 'user-' + Math.floor(Math.random() * 10000)
    const role = identity.startsWith('seller-') ? 'publisher' : 'subscriber'

    const tokenResponse = await fetch(`/api/token?room=${roomName}&identity=${identity}&role=${role}`)
    const { token } = await tokenResponse.json()

    const room: any = {} // Dummy fallback (LiveKit will overwrite)

    await connect(room, serverUrl, token, {
        autoSubscribe: true,
    })

    return room
}
