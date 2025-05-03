const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api/token';

export async function fetchToken({
  room,
  identity,
  role,
}: {
  room: string;
  identity: string;
  role: string;
}): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}?room=${room}&identity=${identity}&role=${role}`);
    const data = await res.json();
    return data.token;
  } catch (err) {
    console.error(`❌ Lỗi gọi token API [${role}]:`, err);
    return null;
  }
}
