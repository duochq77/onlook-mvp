interface FetchTokenParams {
  room: string;
  identity: string;
  role: 'publisher' | 'subscriber';
}

export async function fetchToken({
  room,
  identity,
  role,
}: FetchTokenParams): Promise<string | null> {
  const base = process.env.NEXT_PUBLIC_API_BASE || '/api/token';

  try {
    const res = await fetch(`${base}?room=${room}&identity=${identity}&role=${role}`);
    const data = await res.json();
    return data.token;
  } catch (err) {
    console.error(`❌ Lỗi gọi API token (${role}):`, err);
    return null;
  }
}
