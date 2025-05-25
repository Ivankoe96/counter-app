// src/hooks/useDarkMode.js
import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  // Helper function to get initial mode based on localStorage or system preference
  const getInitialMode = () => {
    // 1. Check for user's explicit preference in localStorage (highest priority)
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedValue = window.localStorage.getItem('darkMode');
        if (storedValue !== null) { // If a value is stored (even "false")
          return JSON.parse(storedValue);
        }
      }
    } catch (error) {
      console.error("Failed to read dark mode from localStorage", error);
    }

    // 2. If no explicit preference, check system preference (next priority)
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // 3. Default to light mode if nothing is found
    return false;
  };

  const [dark, setDark] = useState(getInitialMode); // Initialize state using the helper function

  // useEffect to apply/remove 'dark' class and update localStorage
  useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Save the user's current preference to localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('darkMode', JSON.stringify(dark));
      }
    } catch (error) {
      console.error("Failed to save dark mode to localStorage", error);
    }

  }, [dark]); // Dependency array: re-run this effect when 'dark' state changes

  // useEffect to listen for system color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return; // Exit if not in a browser environment or matchMedia not supported
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Handler for changes in the system preference
    const handleChange = (event) => {
      // Only update if the user hasn't explicitly set a preference via the button
      // We check localStorage again here to ensure the user's explicit choice overrides system.
      try {
        const storedValue = window.localStorage.getItem('darkMode');
        if (storedValue === null) { // If no explicit user choice is stored
          setDark(event.matches); // Update based on system preference
        }
      } catch (error) {
        console.error("Failed to check localStorage on system theme change", error);
      }
    };

    // Add listener
    mediaQuery.addEventListener('change', handleChange);

    // Clean up listener when component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return [dark, setDark];
};