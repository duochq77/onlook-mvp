// Sử dụng CommonJS (module.exports) để tương thích Vercel Node.js runtime
const { AccessToken } = require('livekit-server-sdk');

module.exports = async (req, res) => {
  try {
    const { room, identity } = req.query;

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    console.log('🔐 LIVEKIT_API_KEY:', apiKey);
    console.log('🔐 LIVEKIT_API_SECRET:', apiSecret);
    console.log('📺 room:', room);
    console.log('👤 identity:', identity);

    if (!room || !identity || !apiKey || !apiSecret) {
      console.error('❌ Thiếu tham số hoặc biến môi trường');
      return res.status(400).json({ error: 'Thiếu tham số hoặc cấu hình' });
    }

    const token = new AccessToken(apiKey, apiSecret, {
      identity: String(identity),
      ttl: 3600, // 1 giờ
    });

    token.addGrant({
      roomJoin: true,
      room: String(room),
      canPublish: String(identity).startsWith('seller'),
      canSubscribe: true,
    });

    const jwt = await token.toJwtAsync(); // ✅ Bản SDK v2.x cần dùng async

    if (!jwt || typeof jwt !== 'string') {
      console.error('❌ Token không hợp lệ:', jwt);
      return res.status(500).json({ error: 'Token creation failed' });
    }

    console.log('✅ Token tạo thành công:', jwt.substring(0, 30) + '...');
    return res.status(200).json({ token: jwt });
  } catch (err) {
    console.error('❌ Lỗi khi tạo token:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
