import { useState, useEffect } from 'react';

export function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? item : '';
  });

  useEffect(() => {
    if (storedValue === '') {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, storedValue);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
