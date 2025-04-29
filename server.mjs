import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AccessToken } from 'livekit-server-sdk';

dotenv.config();
const app = express();
const port = 3001;

const apiKey = process.env.VITE_LIVEKIT_API_KEY;
const apiSecret = process.env.VITE_LIVEKIT_API_SECRET;

app.use(cors());

app.get('/api/seller-token', async (req, res) => {
  const roomName = req.query.room || 'onlook-room';

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

app.get('/api/viewer-token', async (req, res) => {
  const roomName = req.query.room || 'onlook-room';

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
  console.log(`✅ LiveKit token server is running at http://localhost:${port}`);
});
