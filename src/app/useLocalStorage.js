import { useEffect, useState } from "react";

const useLocalStorage = (key) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    // Only run in the browser
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      setValue(storedValue);
    }
  }, [key]);

  const setLocalStorage = (newValue) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, newValue);
      setValue(newValue);
    }
  };

  return [value, setLocalStorage];
};

export default useLocalStorage;
