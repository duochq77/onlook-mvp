// File: utils/authUtils.ts
export function isValidRole(role: string): role is 'publisher' | 'subscriber' {
  return role === 'publisher' || role === 'subscriber';
}

export function sanitizeString(input: any): string {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[^a-zA-Z0-9-_]/g, '');
}
