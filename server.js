import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AccessToken } from 'livekit-server-sdk';

dotenv.config();

const app = express();
app.use(cors());

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error('LIVEKIT_API_KEY hoặc LIVEKIT_API_SECRET chưa được thiết lập!');
  process.exit(1);
}

app.get('/get-seller-token', (req, res) => {
  const { roomName } = req.query;
  if (!roomName) {
    return res.status(400).json({ error: 'Thiếu roomName' });
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: 'seller-' + Math.random().toString(36).substring(7),
  });

  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canPublishData: true,
  });

  const token = at.toJwt();
  res.json({ token });
});

app.get('/get-viewer-token', (req, res) => {
  const { roomName } = req.query;
  if (!roomName) {
    return res.status(400).json({ error: 'Thiếu roomName' });
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: 'viewer-' + Math.random().toString(36).substring(7),
  });

  at.addGrant({
    roomJoin: true,
    room: roomName,
    canSubscribe: true,
  });

  const token = at.toJwt();
  res.json({ token });
});

app.listen(3001, () => {
  console.log('✅ Server started at http://localhost:3001');
});
