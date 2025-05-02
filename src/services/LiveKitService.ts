import { Room } from 'livekit-client'

export async function connectToRoom(url: string, token: string) {
  const room = new Room()
  await room.connect(url, token)
  console.log('Connected to LiveKit room', room.name)
  return room
}
