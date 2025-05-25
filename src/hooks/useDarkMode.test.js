// src/hooks/useDarkMode.test.js
import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDarkMode } from './useDarkMode';

describe('useDarkMode', () => {
  const HTML_CLASS = 'dark';
  const LOCAL_STORAGE_KEY = 'darkMode';

  let mockAddEventListener;
  let mockRemoveEventListener;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove(HTML_CLASS);

    mockAddEventListener = vi.fn();
    mockRemoveEventListener = vi.fn();

    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query.includes('dark') ? false : true,
      media: query,
      onchange: null,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: vi.fn(),
    }));
  });

  it('should initially be light mode if no localStorage and system is light', () => {
    const { result } = renderHook(() => useDarkMode());
    const [dark] = result.current;

    expect(dark).toBe(false);
    expect(document.documentElement).not.toHaveClass(HTML_CLASS);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(null);
  });

  it('should initially be dark mode if no localStorage and system is dark', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query.includes('dark') ? true : false,
      media: query,
      onchange: null,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useDarkMode());
    const [dark] = result.current;

    expect(dark).toBe(true);
    expect(document.documentElement).toHaveClass(HTML_CLASS);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(null);
  });

  it('should toggle from light to dark mode', () => {
    const { result } = renderHook(() => useDarkMode());
    let [dark, toggleDark] = result.current;

    expect(dark).toBe(false);
    expect(document.documentElement).not.toHaveClass(HTML_CLASS);

    act(() => {
      toggleDark();
    });

    [dark] = result.current;
    expect(dark).toBe(true);
    expect(document.documentElement).toHaveClass(HTML_CLASS);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe('true');
  });

  it('should toggle from dark to light mode', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    const { result } = renderHook(() => useDarkMode());
    let [dark, toggleDark] = result.current;

    expect(dark).toBe(true);
    expect(document.documentElement).toHaveClass(HTML_CLASS);

    act(() => {
      toggleDark();
    });

    [dark] = result.current;
    expect(dark).toBe(false);
    expect(document.documentElement).not.toHaveClass(HTML_CLASS);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe('false');
  });

  it('should read dark mode preference from localStorage on mount', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    const { result } = renderHook(() => useDarkMode());
    const [dark] = result.current;

    expect(dark).toBe(true);
    expect(document.documentElement).toHaveClass(HTML_CLASS);
  });

  it('should respond to system preference change if no explicit user choice is made', () => {
    const { result } = renderHook(() => useDarkMode());
    let [dark] = result.current;
    expect(dark).toBe(false);

    expect(mockAddEventListener).toHaveBeenCalledTimes(1);
    expect(mockAddEventListener.mock.calls[0][0]).toBe('change');

    act(() => {
      mockAddEventListener.mock.calls[0][1]({ matches: true });
    });

    [dark] = result.current;
    expect(dark).toBe(true);
    expect(document.documentElement).toHaveClass(HTML_CLASS);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(null);
  });

  it('should NOT respond to system preference change if user has an explicit choice', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'false');

    const { result } = renderHook(() => useDarkMode());
    let [dark] = result.current;
    expect(dark).toBe(false);

    expect(mockAddEventListener).toHaveBeenCalledTimes(1);

    act(() => {
      mockAddEventListener.mock.calls[0][1]({ matches: true });
    });

    [dark] = result.current;
    expect(dark).toBe(false);
    expect(document.documentElement).not.toHaveClass(HTML_CLASS);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe('false');
  });
});