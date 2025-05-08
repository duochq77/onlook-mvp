export const signIn = async (email: string, password: string) => {
  // Đơn giản hoá: mô phỏng login
  if (email === 'admin@onlook.vn' && password === 'admin') {
    return { token: 'mock-token', role: 'admin' }
  }
  throw new Error('Thông tin đăng nhập sai')
}
