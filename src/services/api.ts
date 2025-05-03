export async function getToken(room: string, identity: string, role: string): Promise<string> {
  const url = `/api/token?room=${room}&identity=${identity}&role=${role}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch token: ${res.status}`);
  }

  const data = await res.json();
  return data.token;
}
