type FetchTokenParams = {
  room: string;
  identity: string;
  role: 'publisher' | 'subscriber';
};

export async function fetchToken({ room, identity, role }: FetchTokenParams): Promise<string | null> {
  try {
    const url = `/api/token?room=${room}&identity=${identity}&role=${role}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('❌ Lỗi khi lấy token:', error);
    return null;
  }
}
