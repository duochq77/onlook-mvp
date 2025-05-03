import { NextRequest, NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const room = searchParams.get('room');
  const identity = searchParams.get('identity');
  const role = searchParams.get('role'); // publisher hoặc subscriber

  if (!room || !identity || !role) {
    return NextResponse.json({ error: 'Thiếu room, identity hoặc role' }, { status: 400 });
  }

  const apiKey = process.env.LIVEKIT_API_KEY!;
  const apiSecret = process.env.LIVEKIT_API_SECRET!;
  const at = new AccessToken(apiKey, apiSecret, { identity });
  at.addGrant({ room, roomJoin: true, canPublish: role === 'publisher', canSubscribe: true });

  const token = await at.toJwt();
  return NextResponse.json({ token });
}
