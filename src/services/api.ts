const apiBase = process.env.NEXT_PUBLIC_API_BASE || '/api/token';

export async function fetchToken({
  room,
  identity,
  role,
}: {
  room: string;
  identity: string;
  role: 'publisher' | 'subscriber';
}): Promise<string | null> {
  try {
    const res = await fetch(`${apiBase}?room=${room}&identity=${identity}&role=${role}`);
    const data = await res.json();
    return data.token;
  } catch (err) {
    console.error(`❌ Lỗi fetchToken [${role}]:`, err);
    return null;
  }
}
