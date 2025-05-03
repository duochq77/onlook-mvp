export function isUserAuthenticated(): boolean {
  // Giả lập xác thực – sau này tích hợp thật
  return Boolean(localStorage.getItem('user_token'));
}

export function setUserToken(token: string): void {
  localStorage.setItem('user_token', token);
}

export function clearUserToken(): void {
  localStorage.removeItem('user_token');
}
