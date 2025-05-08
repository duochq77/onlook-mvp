import { Room } from 'livekit-client'

export const connectAsSeller = async (
  token: string,
  serverUrl: string
): Promise<Room> => {
  const room = new Room({
    autoSubscribe: true,
  })

  await room.connect(serverUrl, token)
  return room
}
