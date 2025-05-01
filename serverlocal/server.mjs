import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AccessToken } from 'livekit-server-sdk';

dotenv.config();
const app = express();
const port = 3001;

// 🔐 API key & secret từ LiveKit Cloud
const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;

app.use(cors());

// ✅ Token cho người bán
app.get('/api/seller-token', async (req, res) => {
  const roomName = req.query.room || 'onlook-room';

  if (!apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Thiếu LIVEKIT_API_KEY hoặc LIVEKIT_API_SECRET' });
  }

  const token = new AccessToken(apiKey, apiSecret, {
    identity: 'seller-' + Math.random().toString(36).substring(2),
    ttl: 60 * 60,
  });

  token.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  res.json({ token: await token.toJwt() });
});

// ✅ Token cho người xem
app.get('/api/viewer-token', async (req, res) => {
  const roomName = req.query.room || 'onlook-room';

  if (!apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Thiếu LIVEKIT_API_KEY hoặc LIVEKIT_API_SECRET' });
  }

  const token = new AccessToken(apiKey, apiSecret, {
    identity: 'viewer-' + Math.random().toString(36).substring(2),
    ttl: 60 * 60,
  });

  token.addGrant({
    roomJoin: true,
    room: roomName,
    canSubscribe: true,
  });

  res.json({ token: await token.toJwt() });
});

app.listen(port, () => {
  console.log(`✅ Token server chạy tại http://localhost:${port}`);
});

