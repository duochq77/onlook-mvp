// token-server/server.js

const express = require('express');
const cors = require('cors');
const { AccessToken } = require('livekit-server-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Cho phép mọi domain truy cập
app.use(cors());

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
