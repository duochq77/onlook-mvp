// src/services/LiveKitService.ts
import {
    Room,
    RemoteTrack,
    RemoteTrackPublication,
    connect,
    RoomConnectOptions,
    LocalTrack,
} from 'livekit-client'

export async function connectToRoom(
    serverUrl: string,
    token: string,
    onConnected?: (room: Room) => void,
    onTrackSubscribed?: (
        track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: any
    ) => void
): Promise<Room> {
    const room = new Room()

    if (onTrackSubscribed) {
        room.on('trackSubscribed', onTrackSubscribed)
    }

    await room.connect(serverUrl, token, {
        autoSubscribe: true,
    } as RoomConnectOptions)

    onConnected?.(room)
    return room
}

export async function publishTracks(room: Room, tracks: LocalTrack[]) {
    for (const track of tracks) {
        const existing = room.localParticipant.getTrackPublications().find(
            (pub) => pub.track?.mediaStreamTrack.id === track.mediaStreamTrack.id
        )

        if (!existing) {
            await room.localParticipant.publishTrack(track)
        }
    }
}
