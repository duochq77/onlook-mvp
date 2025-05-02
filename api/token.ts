const { AccessToken } = require('livekit-server-sdk');

module.exports = async (req, res) => {
  try {
    const { room, identity } = req.query;

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!room || !identity || !apiKey || !apiSecret) {
      console.error('❌ Thiếu room, identity, apiKey hoặc apiSecret');
      return res.status(500).json({ error: 'Missing required parameters or configuration' });
    }

    const token = new AccessToken(apiKey, apiSecret, {
      identity,
      ttl: 3600,
    });

    token.addGrant({
      roomJoin: true,
      room,
      canPublish: identity.startsWith('seller'),
      canSubscribe: true,
    });

    const jwt = token.toJwt();
    console.log(`✅ Token created for ${identity}`);
    res.status(200).json({ token: jwt });
  } catch (err) {
    console.error('❌ Lỗi tạo token:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
