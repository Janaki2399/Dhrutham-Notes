import { useEffect, useState } from "react";

export const useDebounce = (searchQuery, delay) => {
  const [debouncedValue, setDebouncedValue] = useState();

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(searchQuery), delay);
    return () => clearTimeout(id);
  });

  return debouncedValue;
};
