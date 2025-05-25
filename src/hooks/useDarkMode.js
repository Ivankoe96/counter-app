// src/hooks/useDarkMode.js
import { useState, useEffect, useCallback } from 'react';

// Key for localStorage
const LOCAL_STORAGE_KEY = 'darkMode';

export const useDarkMode = () => {
  // Use a state to track if dark mode is active
  const [dark, setDark] = useState(() => {
    // This initializer function runs only once on initial render

    // 1. Check for user's explicit preference in localStorage (highest priority)
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedValue !== null) {
          // If a value is stored, it's an explicit user choice, so use it
          return JSON.parse(storedValue);
        }
      }
    } catch (error) {
      console.error("Failed to read dark mode from localStorage", error);
      // Fallback in case of localStorage error
    }

    // 2. If no explicit preference, check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // 3. Default to light mode if nothing is found
    return false;
  });

  // Function to toggle dark mode AND save the user's explicit choice
  const toggleDarkMode = useCallback(() => {
    setDark(prevDark => {
      const newDarkState = !prevDark;
      // Save this explicit user choice to localStorage
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDarkState));
        }
      } catch (error) {
        console.error("Failed to save dark mode to localStorage", error);
      }
      return newDarkState;
    });
  }, []);

  // Effect to apply/remove 'dark' class on the HTML element
  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [dark]); // Re-run when 'dark' state changes

  // Effect to listen for system color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = (event) => {
      // IMPORTANT: Only update if there's NO explicit user preference stored.
      // If localStorage contains a value, it means the user manually set it,
      // and we should respect their choice over system changes.
      try {
        const explicitUserChoice = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (explicitUserChoice === null) {
          // If no explicit choice, follow the system preference
          setDark(event.matches);
        }
      } catch (error) {
        console.error("Failed to check localStorage on system theme change", error);
      }
    };

    // Add listener
    mediaQuery.addEventListener('change', handleSystemChange);

    // Clean up listener
    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, []); // Runs once on mount, cleans up on unmount

  // Return the current dark mode state and the toggle function
  return [dark, toggleDarkMode];
};