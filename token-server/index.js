const express = require('express');
const dotenv = require('dotenv');
const { AccessToken } = require('livekit-server-sdk');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/token', async (req, res) => {
  const { room, identity, role } = req.query;

  if (!room || !identity || !role) {
    return res.status(400).json({ error: 'Missing room, identity, or role' });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Missing API credentials' });
  }

  const token = new AccessToken(apiKey, apiSecret, { identity });
  token.addGrant({
    room,
    roomJoin: true,
    canPublish: role === 'publisher',
    canSubscribe: true,
  });

  try {
    const jwt = await token.toJwt(); // ✅ FINAL FIXED LINE
    console.log('✅ JWT:', jwt);
    return res.status(200).json({ token: jwt });
  } catch (err) {
    console.error('❌ JWT creation error:', err);
    return res.status(500).json({ error: 'JWT creation failed' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Token server running at http://localhost:${port}`);
});
