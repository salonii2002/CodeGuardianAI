
import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);

      return saved !== null
        ? JSON.parse(saved)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  const updateValue = (newValue) => {
    setValue((previous) => {
      const nextValue =
        typeof newValue === "function"
          ? newValue(previous)
          : newValue;

      try {
        localStorage.setItem(key, JSON.stringify(nextValue));
      } catch {
        // Storage may be unavailable or full.
      }

      return nextValue;
    });
  };

  const removeValue = () => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage errors.
    }

    setValue(initialValue);
  };

  return [value, updateValue, removeValue];
}

export default useLocalStorage;
