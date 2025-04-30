const { AccessToken } = require('livekit-server-sdk');

module.exports = async function handler(req, res) {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Thiếu API Key hoặc Secret' });
  }

  try {
    const room = req.query.room || 'default';
    const identity = 'seller-' + Math.random().toString(36).substring(2, 10);

    const at = new AccessToken(apiKey, apiSecret, {
      identity,
      name: identity,
    });

    at.addGrant({
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      room: room,
    });

    const token = at.toJwt();
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Lỗi khi tạo token:', err);
    return res.status(500).json({ error: 'Không thể tạo token' });
  }
};
