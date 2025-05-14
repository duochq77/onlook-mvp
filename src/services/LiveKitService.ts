import { connect } from 'livekit-client'

export async function connectToRoom(): Promise<any> {
    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || ''
    const roomName = 'default-room'
    const identity = 'seller-' + Math.floor(Math.random() * 10000)
    const role = 'publisher'

    const tokenResponse = await fetch(`/api/token?room=${roomName}&identity=${identity}&role=${role}`)
    const { token } = await tokenResponse.json()

    const room: any = {} // Placeholder nếu cần
    await connect(room, serverUrl, token, {
        autoSubscribe: true,
    })

    return room
}
