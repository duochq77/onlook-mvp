const express = require('express');
const cors = require('cors');
const { AccessToken } = require('livekit-server-sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

// ✅ Cấu hình đúng CORS cho domain production
app.use(cors({
  origin: ['https://onlookmarket.live', 'https://www.onlookmarket.live'],
  credentials: true,
}));

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
    const jwt = await token.toJwt();
    res.setHeader('Access-Control-Allow-Origin', '*'); // ✅ fallback nếu CORS strict
    res.json({ token: jwt });
  } catch (err) {
    console.error('❌ Token creation error:', err);
    res.status(500).json({ error: 'JWT creation failed' });
  }
});

app.listen(port, () => {
  console.log(`✅ Token server running on port ${port}`);
});
