const { AccessToken } = require('livekit-server-sdk');

module.exports = async (req, res) => {
  try {
    const { room, identity } = req.query;

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!room || !identity || !apiKey || !apiSecret) {
      console.error('❌ Missing params or env');
      return res.status(400).json({ error: 'Missing required parameters or config' });
    }

    const token = new AccessToken(apiKey, apiSecret, {
      identity: identity.toString(),
      ttl: 3600,
    });

    token.addGrant({
      roomJoin: true,
      room: room.toString(),
      canPublish: identity.toString().startsWith('seller'),
      canSubscribe: true,
    });

    const jwt = token.toJwt(); // ✅ Đây phải là string JWT

    if (!jwt || typeof jwt !== 'string') {
      console.error('❌ Token is empty or not string');
      return res.status(500).json({ error: 'Token creation failed' });
    }

    console.log('✅ Token generated for', identity);
    res.status(200).json({ token: jwt });
  } catch (err) {
    console.error('❌ Token error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
