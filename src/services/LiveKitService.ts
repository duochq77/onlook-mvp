import { Room } from 'livekit-client'

export const connectAsSeller = async (
  token: string,
  serverUrl: string
): Promise<Room> => {
  const room = new Room()

  await room.connect(serverUrl, token, {
    autoSubscribe: true,
  })

  return room
}
