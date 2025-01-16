import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Try to get a value from localStorage by the key
      const item = window?.localStorage?.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Function to set a value in localStorage
  const setValue = (value) => {
      // Save the state to localStorage
      window?.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    
  };

  useEffect(() => {
    // Listen for changes to key from other tabs/windows
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
        }
      }
    };

    window?.addEventListener("storage", handleStorageChange);

    return () => {
      window?.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
