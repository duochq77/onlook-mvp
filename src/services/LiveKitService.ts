import { connect, Room, RoomConnectOptions, RemoteTrack, RemoteTrackPublication, Participant } from 'livekit-client'

export async function connectToRoom(): Promise<Room> {
    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || ''
    const roomName = 'default-room'
    const identity = 'seller-' + Math.floor(Math.random() * 10000)
    const role = 'publisher'

    const tokenResponse = await fetch(`/api/token?room=${roomName}&identity=${identity}&role=${role}`)
    const { token } = await tokenResponse.json()

    const room = new Room()

    await connect(room, serverUrl, token, {
        autoSubscribe: true,
    } as RoomConnectOptions)

    room.on('participantConnected', (participant: Participant) => {
        console.log(`👤 Participant connected: ${participant.identity}`)
    })

    room.on('trackSubscribed', (track: RemoteTrack, publication: RemoteTrackPublication, participant: Participant) => {
        console.log(`📡 Subscribed to ${track.kind} from ${participant.identity}`)
    })

    return room
}
