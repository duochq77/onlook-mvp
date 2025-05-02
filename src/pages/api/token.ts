const { AccessToken, VideoGrant } = require('livekit-server-sdk');

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
module.exports = /** @type {import('next').NextApiHandler} */ ((req, res) => {
  try {
    const { room, identity, role } = req.query;

    if (
      !room || !identity || !role ||
      typeof room !== 'string' ||
      typeof identity !== 'string' ||
      typeof role !== 'string'
    ) {
      return res.status(400).json({ error: 'Missing or invalid room, identity, or role' });
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return res.status(500).json({ error: 'Missing LiveKit API credentials' });
    }

    const grant = {
      room,
      roomJoin: true,
      canPublish: role === 'publisher',
      canSubscribe: true,
    };

    const token = new AccessToken(apiKey, apiSecret, { identity });
    token.addGrant(grant);

    const jwt = token.toJwt();

    return res.status(200).json({ token: jwt });
  } catch (error) {
    console.error('❌ Token creation failed:', error);

    return res.status(500).json({
      error: 'Token creation failed',
      message: typeof error === 'object' && error?.message
        ? error.message
        : 'Unknown error',
    });
  }
});
