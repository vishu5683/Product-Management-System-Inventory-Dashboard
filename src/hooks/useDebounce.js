import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of a value.
 * Useful for delaying expensive operations like filtering.
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

