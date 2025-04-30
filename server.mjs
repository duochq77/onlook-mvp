app.get('/api/seller-token', async (req, res) => {
  const roomName = req.query.room || 'onlook-room';

  // ✅ Kiểm tra trước khi tạo token
  if (!apiKey || !apiSecret) {
    console.error('❌ API key hoặc secret không tồn tại. Kiểm tra biến môi trường .env');
    return res.status(500).json({ error: 'Missing LiveKit API credentials' });
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

app.get('/api/viewer-token', async (req, res) => {
  const roomName = req.query.room || 'onlook-room';

  // ✅ Kiểm tra luôn ở đây nữa
  if (!apiKey || !apiSecret) {
    console.error('❌ API key hoặc secret không tồn tại. Kiểm tra biến môi trường .env');
    return res.status(500).json({ error: 'Missing LiveKit API credentials' });
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
