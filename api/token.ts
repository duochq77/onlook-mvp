const { AccessToken } = require('livekit-server-sdk');

module.exports = async (req, res) => {
  try {
    const { room, identity } = req.query;

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!room || !identity || !apiKey || !apiSecret) {
      console.error('❌ Missing parameters or env vars');
      return res.status(400).json({ error: 'Missing parameters or configuration' });
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

    const jwt = token.toJwt(); // 👈 Đảm bảo đây là chuỗi, không phải object

    console.log('✅ Token generated for:', identity);
    res.status(200).json({ token: jwt });
  } catch (err) {
    console.error('❌ Token generation error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
