// src/utils/storageUtils.ts

export const saveToStorage = (key: string, value: any): void => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error("Failed to save to storage:", error);
    }
  };
  
  export const loadFromStorage = <T = any>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error("Failed to load from storage:", error);
      return null;
    }
  };
  
  export const removeFromStorage = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Failed to remove from storage:", error);
    }
  };
  