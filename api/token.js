const { AccessToken } = require('livekit-server-sdk');

module.exports = (req, res) => {
  try {
    const { room, identity, role } = req.query;

    console.log('🚀 Nhận yêu cầu tạo token cho:', { room, identity, role });

    if (!room || !identity || !role ||
        typeof room !== 'string' ||
        typeof identity !== 'string' ||
        typeof role !== 'string') {
      console.log('❌ Thiếu tham số');
      return res.status(400).json({ error: 'Missing or invalid room, identity, or role' });
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      console.log('❌ Thiếu API key/secret');
      return res.status(500).json({ error: 'Missing LiveKit API credentials' });
    }

    const token = new AccessToken(apiKey, apiSecret, { identity });
    token.addGrant({
      room,
      roomJoin: true,
      canPublish: role === 'publisher',
      canSubscribe: true
    });

    const jwt = token.toJwt();

    console.log('🔐 JWT kết quả:', jwt);
    console.log('🔎 Kiểu dữ liệu JWT:', typeof jwt);

    return res.status(200).json({ token: jwt });
  } catch (error) {
    console.error('❌ Token creation failed:', error);
    return res.status(500).json({
      error: 'Token creation failed',
      message: error?.message || 'Unknown error',
    });
  }
};
