export async function getToken(room: string, identity: string, role: string): Promise<string> {
  const res = await fetch(
    `/api/token?room=${room}&identity=${identity}&role=${role}`
  );

  if (!res.ok) {
    throw new Error(`Lỗi khi lấy token: ${res.statusText}`);
  }

  const data = await res.json();
  return data.token;
}
