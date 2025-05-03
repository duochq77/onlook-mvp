export async function getToken({
  room,
  identity,
  role,
}: {
  room: string
  identity: string
  role: 'publisher' | 'subscriber'
}): Promise<string | null> {
  try {
    const res = await fetch(`/api/token?room=${room}&identity=${identity}&role=${role}`);
    const data = await res.json();
    return data.token || null;
  } catch (err) {
    console.error('❌ Lỗi lấy token từ API:', err);
    return null;
  }
}
