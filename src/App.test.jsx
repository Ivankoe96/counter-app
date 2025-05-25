// src/App.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App'; // Import the component you want to test

// Mock Framer Motion's AnimatePresence to avoid complex animation issues in tests
// For simpler tests, you can often just mock the component entirely
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    motion: {
      div: (props) => <div {...props} />, // Render a div instead of motion.div
      button: (props) => <button {...props} />, // Render a button instead of motion.button
    },
    AnimatePresence: ({ children }) => children, // Just render children without animation logic
  };
});

describe('Counter App', () => {
  // Clear localStorage before each test to ensure a clean state
  beforeEach(() => {
    localStorage.clear();
    // Reset document.documentElement.classList as it's manipulated by the dark mode hook
    document.documentElement.className = '';
  });

  it('renders the initial count of 0', () => {
    render(<App />);
    // screen.getByText finds an element with the given text
    // We use a regular expression for more flexibility in matching
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });

  it('increments the count by 1 when +1 button is clicked', () => {
    render(<App />);
    const plusOneButton = screen.getByRole('button', { name: '+1' });

    fireEvent.click(plusOneButton); // Simulate a click
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();

    fireEvent.click(plusOneButton); // Click again
    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument();
  });

  it('decrements the count by 1 when -1 button is clicked', () => {
    render(<App />);
    const plusOneButton = screen.getByRole('button', { name: '+1' });
    const minusOneButton = screen.getByRole('button', { name: '-1' });

    fireEvent.click(plusOneButton); // Increment to 1 first
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();

    fireEvent.click(minusOneButton); // Decrement
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });

  it('does not decrement below 0 when -1 button is clicked', () => {
    render(<App />);
    const minusOneButton = screen.getByRole('button', { name: '-1' });

    fireEvent.click(minusOneButton); // Should stay at 0
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
    expect(minusOneButton).toBeDisabled(); // Also check if button is disabled
  });

  it('resets the count to 0 when Reset button is clicked', () => {
    render(<App />);
    const plusOneButton = screen.getByRole('button', { name: '+1' });
    const resetButton = screen.getByRole('button', { name: 'Reset' });

    fireEvent.click(plusOneButton); // Count = 1
    fireEvent.click(plusOneButton); // Count = 2
    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument();

    fireEvent.click(resetButton); // Reset
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });

  it('increments the count by 5 when +5 button is clicked', () => {
    render(<App />);
    const plusFiveButton = screen.getByRole('button', { name: '+5' });

    fireEvent.click(plusFiveButton);
    expect(screen.getByText(/Count: 5/i)).toBeInTheDocument();

    fireEvent.click(plusFiveButton);
    expect(screen.getByText(/Count: 10/i)).toBeInTheDocument();
  });

  it('decrements the count by 5 when -5 button is clicked and count is sufficient', () => {
    render(<App />);
    const plusFiveButton = screen.getByRole('button', { name: '+5' });
    const minusFiveButton = screen.getByRole('button', { name: '-5' });

    fireEvent.click(plusFiveButton); // Count = 5
    expect(screen.getByText(/Count: 5/i)).toBeInTheDocument();

    fireEvent.click(minusFiveButton); // Count = 0
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });

  it('does not decrement below 0 when -5 button is clicked', () => {
    render(<App />);
    const minusFiveButton = screen.getByRole('button', { name: '-5' });
    expect(minusFiveButton).toBeDisabled(); // Should be disabled initially

    fireEvent.click(minusFiveButton); // Should remain 0
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();

    const plusOneButton = screen.getByRole('button', { name: '+1' });
    fireEvent.click(plusOneButton); // Count = 1
    fireEvent.click(plusOneButton); // Count = 2
    fireEvent.click(minusFiveButton); // Should remain 0
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });
});