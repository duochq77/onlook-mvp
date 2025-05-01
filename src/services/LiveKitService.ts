import { connect } from 'livekit-client';

export async function connectToLiveKit(token: string, roomName: string) {
  const room = await connect(process.env.VITE_LIVEKIT_URL!, token, {
    autoSubscribe: true,
  });

  console.log(`🔗 Đã kết nối tới phòng: ${roomName}`);
  return room;
}
