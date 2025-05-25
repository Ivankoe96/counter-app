// src/hooks/useDarkMode.js
import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  // 1. Initialize state for dark mode.
  //    Try to read from localStorage first, otherwise default to false (light mode).
  const [dark, setDark] = useState(() => {
    try {
      // Check if localStorage is available (might not be in SSR environments)
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedValue = window.localStorage.getItem('darkMode');
        // localStorage stores strings, so convert "true" to true boolean
        return storedValue ? JSON.parse(storedValue) : false;
      }
    } catch (error) {
      console.error("Failed to read dark mode from localStorage", error);
    }
    return false; // Default to light mode if localStorage fails or is not available
  });

  // 2. useEffect to apply/remove 'dark' class and update localStorage
  useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    try {
      // Save the current dark mode preference to localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('darkMode', JSON.stringify(dark));
      }
    } catch (error) {
      console.error("Failed to save dark mode to localStorage", error);
    }

  }, [dark]); // Re-run this effect whenever the 'dark' state changes

  // 3. Return the state and setter function
  return [dark, setDark];
};