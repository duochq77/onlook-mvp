const { AccessToken } = require('livekit-server-sdk');

module.exports = async function handler(req, res) {
  const API_KEY = process.env.LIVEKIT_API_KEY;
  const API_SECRET = process.env.LIVEKIT_API_SECRET;

  if (!API_KEY || !API_SECRET) {
    return res.status(500).json({ error: 'Thiếu thông tin LiveKit' });
  }

  try {
    const { room = 'a' } = req.query;
    const identity = 'seller-' + Math.random().toString(36).substring(2, 10);

    const at = new AccessToken(API_KEY, API_SECRET, {
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
    console.error('Lỗi tạo token:', err);
    return res.status(500).json({ error: 'Token creation failed' });
  }
}
