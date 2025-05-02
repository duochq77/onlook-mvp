const { AccessToken } = require('livekit-server-sdk');

module.exports = (req, res) => {
  try {
    const { room, identity, role } = req.query;

    console.log('📥 Input:', { room, identity, role });

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      console.log('🔐 Thiếu API key hoặc secret');
      return res.status(500).json({ error: 'Missing LiveKit API credentials' });
    }

    const token = new AccessToken(apiKey, apiSecret, { identity });

    token.addGrant({
      room,
      roomJoin: true,
      canPublish: role === 'publisher',
      canSubscribe: true
    });

    const jwt = token.toJwt(); // ✅ dùng bản sync

    console.log('✅ JWT:', jwt);

    return res.status(200).json({ token: jwt });
  } catch (error) {
    console.error('❌ Token creation failed:', error);
    return res.status(500).json({
      error: 'Token creation failed',
      message: error?.message || 'Unknown error',
    });
  }
};
