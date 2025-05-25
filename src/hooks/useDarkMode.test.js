// src/hooks/useDarkMode.test.js
import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDarkMode } from './useDarkMode'; // Import your custom hook

describe('useDarkMode', () => {
  const HTML_CLASS = 'dark';
  const LOCAL_STORAGE_KEY = 'darkMode';

  // Clear localStorage and reset html class before each test
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove(HTML_CLASS);
    // Mock window.matchMedia for consistent testing of system preference
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query.includes('dark') ? false : true, // Default to light system preference
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  // Test Case 1: Initial state (no localStorage, default to light system)
  it('should initially be light mode if no localStorage and system is light', () => {
    const { result } = renderHook(() => useDarkMode());
    const [dark] = result.current;

    expect(dark).toBe(false);
    expect(document.documentElement).not.toHaveClass(HTML_CLASS);
  });

  // Test Case 2: Initial state (no localStorage, system is dark)
  it('should initially be dark mode if no localStorage and system is dark', () => {
    // Override matchMedia to simulate a dark system preference
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query.includes('dark') ? true : false, // Simulate dark system preference
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useDarkMode());
    const [dark] = result.current;

    expect(dark).toBe(true);
    expect(document.documentElement).toHaveClass(HTML_CLASS);
  });

  // Test Case 3: Toggling from light to dark
  it('should toggle from light to dark mode', () => {
    const { result } = renderHook(() => useDarkMode());
    let [dark, setDark] = result.current;

    expect(dark).toBe(false);
    expect(document.documentElement).not.toHaveClass(HTML_CLASS);

    // Use `act` to wrap state updates that cause re-renders
    act(() => {
      setDark(true);
    });

    [dark] = result.current; // Destructure again to get the updated value
    expect(dark).toBe(true);
    expect(document.documentElement).toHaveClass(HTML_CLASS);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe('true');
  });

  // Test Case 4: Toggling from dark to light
  it('should toggle from dark to light mode', () => {
    // Start with dark mode explicitly set in localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');

    const { result } = renderHook(() => useDarkMode());
    let [dark, setDark] = result.current;

    expect(dark).toBe(true); // Should be dark because of localStorage
    expect(document.documentElement).toHaveClass(HTML_CLASS);

    act(() => {
      setDark(false);
    });

    [dark] = result.current;
    expect(dark).toBe(false);
    expect(document.documentElement).not.toHaveClass(HTML_CLASS);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe('false');
  });

  // Test Case 5: Persistence - reads from localStorage on re-render
  it('should read dark mode preference from localStorage on mount', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true'); // Set a preference

    const { result } = renderHook(() => useDarkMode());
    const [dark] = result.current;

    expect(dark).toBe(true);
    expect(document.documentElement).toHaveClass(HTML_CLASS);
  });

  // Test Case 6: System preference change, no explicit user choice
  it('should respond to system preference change if no explicit user choice is made', () => {
    const { result } = renderHook(() => useDarkMode());
    let [dark] = result.current;
    expect(dark).toBe(false); // Initial state based on mocked light system

    // Trigger a system preference change to dark
    act(() => {
      // Simulate the `change` event from matchMedia
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener.mock.calls[0][1]({ matches: true });
    });

    [dark] = result.current;
    expect(dark).toBe(true);
    expect(document.documentElement).toHaveClass(HTML_CLASS);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe('true'); // Should save the new state
  });

  // Test Case 7: System preference change, but user has explicit choice
  it('should NOT respond to system preference change if user has an explicit choice', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'false'); // User explicitly set light mode

    const { result } = renderHook(() => useDarkMode());
    let [dark] = result.current;
    expect(dark).toBe(false); // Should be light due to explicit choice

    // Trigger a system preference change to dark
    act(() => {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener.mock.calls[0][1]({ matches: true });
    });

    [dark] = result.current;
    expect(dark).toBe(false); // Should remain light
    expect(document.documentElement).not.toHaveClass(HTML_CLASS);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe('false'); // Should keep the explicit choice
  });
});