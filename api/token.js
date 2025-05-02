const { AccessToken } = require('livekit-server-sdk');

module.exports = async (req, res) => {
  try {
    const { room, identity, role } = req.query;

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return res.status(500).json({ error: 'Missing LiveKit API credentials' });
    }

    const token = new AccessToken(apiKey, apiSecret, { identity });

    token.addGrant({
      room,
      roomJoin: true,
      canPublish: role === 'publisher',
      canSubscribe: true,
    });

    const jwt = await token.toJwt(); // ✅ SYNC (2.12.0 dùng bản sync)
    return res.status(200).json({ token: jwt });

  } catch (error) {
    console.error('❌ Token creation failed:', error);
    return res.status(500).json({
      error: 'Token creation failed',
      message: error?.message || 'Unknown error',
    });
  }
};
