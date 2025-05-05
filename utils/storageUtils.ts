// File: utils/storageUtils.ts

export function saveToLocalStorage(key: string, value: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getFromLocalStorage<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }
  return null;
}

export function removeFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}
