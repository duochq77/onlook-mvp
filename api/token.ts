const { AccessToken } = require('livekit-server-sdk');

module.exports = async (req, res) => {
  try {
    const { room, identity } = req.query;

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!room || !identity || !apiKey || !apiSecret) {
      console.error('❌ Thiếu room, identity hoặc cấu hình');
      return res.status(400).json({ error: 'Missing parameters or config' });
    }

    const token = new AccessToken(apiKey, apiSecret, {
      identity: String(identity),
      ttl: 3600,
    });

    token.addGrant({
      roomJoin: true,
      room: String(room),
      canPublish: String(identity).startsWith('seller'),
      canSubscribe: true,
    });

    const jwt = await token.toJwtAsync(); // ✅ bản 2.x dùng hàm async

    if (!jwt || typeof jwt !== 'string') {
      console.error('❌ Token tạo ra không hợp lệ');
      return res.status(500).json({ error: 'Token creation failed' });
    }

    console.log('✅ Token created for', identity);
    return res.status(200).json({ token: jwt });
  } catch (err) {
    console.error('❌ Lỗi tạo token:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
