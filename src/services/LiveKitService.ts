import { connect, Room } from 'livekit-client'

export const connectAsSeller = async (token: string, serverUrl: string): Promise<Room> => {
  const room = await connect(serverUrl, token, {
    autoSubscribe: true
  })
  return room
}
