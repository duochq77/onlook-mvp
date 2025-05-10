import {
  Room,
  RoomEvent,
  RemoteTrackPublication,
  RemoteTrack
} from 'livekit-client'

export async function connectToRoom(
  serverUrl: string,
  token: string,
  onConnected: (room: Room) => void,
  onTrackSubscribed?: (
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: any
  ) => void
): Promise<Room> {
  const room = new Room()

  if (onTrackSubscribed) {
    room.on(RoomEvent.TrackSubscribed, onTrackSubscribed)
  }

  try {
    await room.connect(serverUrl, token)
    onConnected(room)
    return room
  } catch (error) {
    console.error('❌ Failed to connect to LiveKit room:', error)
    throw error
  }
}
