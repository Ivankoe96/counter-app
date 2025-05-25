// src/hooks/useCounter.js
import { useState, useCallback } from 'react';

/**
 * Custom hook for managing a counter's state and logic.
 *
 * @param {number} initialValue The initial value of the counter.
 * @returns {[number, Function, Function, Function]} An array containing:
 * - The current count.
 * - Function to increment the count.
 * - Function to decrement the count.
 * - Function to reset the count.
 */
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback((value = 1) => {
    setCount(prevCount => prevCount + value);
  }, []);

  const decrement = useCallback((value = 1) => {
    setCount(prevCount => Math.max(0, prevCount - value));
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return [count, increment, decrement, reset];
}