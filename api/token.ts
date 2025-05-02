import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req: any, res: any) {
  try {
    const { room, identity } = req.query;

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const livekitHost = process.env.LIVEKIT_URL;

    // 🛑 Kiểm tra thiếu thông tin
    if (!room || !identity) {
      console.error('❌ Thiếu room hoặc identity');
      return res.status(400).json({ error: 'Thiếu room hoặc identity' });
    }
    if (!apiKey || !apiSecret || !livekitHost) {
      console.error('❌ Thiếu biến môi trường: LIVEKIT_API_KEY, LIVEKIT_API_SECRET hoặc LIVEKIT_URL');
      return res.status(500).json({ error: 'Thiếu cấu hình máy chủ LiveKit' });
    }

    // ✅ Tạo token
    const at = new AccessToken(apiKey, apiSecret, {
      identity,
      ttl: 3600,
    });

    at.addGrant({
      roomJoin: true,
      room,
      canPublish: identity.startsWith('seller'),
      canSubscribe: true,
    });

    const jwt = at.toJwt();

    console.log(`🎫 Token tạo cho ${identity}: ${jwt}`);

    return res.status(200).json({ token: jwt });
  } catch (err: any) {
    console.error('❌ Lỗi tạo token:', err);
    return res.status(500).json({ error: 'Lỗi server khi tạo token' });
  }
}
