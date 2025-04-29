// src/api/livekit-token.ts
import express from 'express';
import { AccessToken } from 'livekit-server-sdk';

const router = express.Router();

const apiKey = process.env.VITE_LIVEKIT_API_KEY!;
const apiSecret = process.env.VITE_LIVEKIT_API_SECRET!;
const livekitHost = process.env.VITE_LIVEKIT_URL!;

router.get('/seller-token', (req, res) => {
  const token = new AccessToken(apiKey, apiSecret, {
    identity: 'seller-' + Math.random().toString(36).slice(2),
    ttl: 60 * 60, // 1 giờ
  });
  token.addGrant({ roomJoin: true, room: 'onlook-room', canPublish: true, canSubscribe: true });
  res.json({ token: token.toJwt() });
});

router.get('/viewer-token', (req, res) => {
  const token = new AccessToken(apiKey, apiSecret, {
    identity: 'viewer-' + Math.random().toString(36).slice(2),
    ttl: 60 * 60,
  });
  token.addGrant({ roomJoin: true, room: 'onlook-room', canSubscribe: true });
  res.json({ token: token.toJwt() });
});

export default router;
