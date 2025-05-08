export const fetchToken = async (room: string, identity: string, role: string) => {
  const response = await fetch(`/api/token?room=${room}&identity=${identity}&role=${role}`)
  if (!response.ok) {
    throw new Error('Không thể lấy token')
  }
  const data = await response.json()
  return data.token
}
