import { useEffect, useState } from "react";

/*
========================================
Custom Hook: useDebounce
========================================
Ye hook kisi bhi value ko delay karta hai.
Mostly search inputs ke liye use hota hai.
*/

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
