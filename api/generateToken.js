const { AccessToken } = require('livekit-server-sdk');

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;

module.exports = async function generateToken(room, identity, role) {
  if (!room || !identity || !role) {
    throw new Error('Missing room, identity, or role');
  }

  const token = new AccessToken(apiKey, apiSecret, {
    identity: identity,
    ttl: 60 * 60, // Thời gian sống của token (1 giờ)
  });

  token.addGrant({
    room: room,
    roomJoin: true,
    canPublish: role === 'publisher',
    canSubscribe: true,
  });

  const jwt = await token.toJwt();
  return jwt;
};
