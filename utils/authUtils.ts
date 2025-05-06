// utils/authUtils.ts

export function isValidRole(role: string): role is 'publisher' | 'subscriber' {
  return role === 'publisher' || role === 'subscriber';
}

export function sanitizeString(input: any): string {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[^a-zA-Z0-9-_]/g, '');
}

// Thêm hàm signIn
export async function signIn(email: string, password: string) {
  // Logic đăng nhập ở đây, ví dụ:
  if (!email || !password) {
    throw new Error("Email và mật khẩu không thể trống");
  }

  // Giả sử đăng nhập thành công, trả về kết quả
  return { email, message: "Đăng nhập thành công!" };
}
