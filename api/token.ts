// api/token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import generateToken from './generateToken.d';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, identity, role } = req.query;

  try {
    if (!room || !identity || !role) {
      return res.status(400).json({ error: 'Missing room, identity, or role' });
    }

    const { token, livekitHost } = await generateToken(room as string, identity as string, role as string);
    res.status(200).json({ token, livekitHost });  // Trả về livekitHost nếu cần
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
