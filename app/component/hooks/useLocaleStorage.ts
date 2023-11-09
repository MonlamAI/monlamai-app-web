import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Try to get a value from localStorage by the key
      const item = window?.localStorage?.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If there's an error, return the initial value
      // console.error("Error retrieving data from localStorage:", error);
      return initialValue;
    }
  });

  // Function to set a value in localStorage
  const setValue = (value) => {
    try {
      // Save the state to localStorage
      window?.localStorage.setItem(key, JSON.stringify(value));
      // Update the state with the new value
      setStoredValue(value);
    } catch (error) {
      console.error("Error storing data in localStorage:", error);
    }
  };

  useEffect(() => {
    // Listen for changes to key from other tabs/windows
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error("Error parsing data from localStorage:", error);
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
