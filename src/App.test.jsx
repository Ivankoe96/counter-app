// src/App.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

// Define a helper to filter out Framer Motion specific props
const filterMotionProps = ({
  animate,
  initial,
  transition,
  exit,
  variants,
  whileTap,
  whileHover,
  drag,
  dragConstraints,
  dragElastic,
  dragMomentum,
  dragTransition,
  onDragStart,
  onDragEnd,
  onAnimationStart,
  onAnimationComplete,
  ...rest
}) => rest;

vi.mock('framer-motion', () => ({
  motion: {
    div: (props) => <div {...filterMotionProps(props)}>{props.children}</div>,
    button: (props) => <button {...filterMotionProps(props)}>{props.children}</button>,
    span: (props) => <span {...filterMotionProps(props)}>{props.children}</span>,
  },
  AnimatePresence: ({ children }) => {
    if (Array.isArray(children)) {
      return children[children.length - 1];
    }
    return children;
  },
}));

describe('Counter App', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('renders the initial count of 0', () => {
    render(<App />);
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });

  it('increments the count by 1 when +1 button is clicked', () => {
    render(<App />);
    const plusOneButton = screen.getByRole('button', { name: '+1' });

    fireEvent.click(plusOneButton);
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();

    fireEvent.click(plusOneButton);
    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument();
  });

  it('decrements the count by 1 when -1 button is clicked', () => {
    render(<App />);
    const plusOneButton = screen.getByRole('button', { name: '+1' });
    const minusOneButton = screen.getByRole('button', { name: '-1' });

    fireEvent.click(plusOneButton);
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();

    fireEvent.click(minusOneButton);
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });

  it('does not decrement below 0 when -1 button is clicked', () => {
    render(<App />);
    const minusOneButton = screen.getByRole('button', { name: '-1' });

    fireEvent.click(minusOneButton);
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
    expect(minusOneButton).toBeDisabled();
  });

  it('resets the count to 0 when Reset button is clicked', () => {
    render(<App />);
    const plusOneButton = screen.getByRole('button', { name: '+1' });
    const resetButton = screen.getByRole('button', { name: 'Reset' });

    fireEvent.click(plusOneButton);
    fireEvent.click(plusOneButton);
    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument();

    fireEvent.click(resetButton);
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

    fireEvent.click(plusFiveButton); // Count becomes 5
    expect(screen.getByText(/Count: 5/i)).toBeInTheDocument();

    fireEvent.click(minusFiveButton); // Count becomes 0
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });

  // NEW OR MODIFIED TEST CASES FOR -5 BUTTON BEHAVIOR
  it('disables the -5 button when count is less than 5', () => {
    render(<App />);
    const minusFiveButton = screen.getByRole('button', { name: '-5' });

    // Initially, count is 0, so button should be disabled
    expect(minusFiveButton).toBeDisabled();

    // Increment to 1, button should still be disabled
    fireEvent.click(screen.getByRole('button', { name: '+1' }));
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();
    expect(minusFiveButton).toBeDisabled();

    // Increment to 4, button should still be disabled
    fireEvent.click(screen.getByRole('button', { name: '+1' }));
    fireEvent.click(screen.getByRole('button', { name: '+1' }));
    fireEvent.click(screen.getByRole('button', { name: '+1' })); // Count is now 4
    expect(screen.getByText(/Count: 4/i)).toBeInTheDocument();
    expect(minusFiveButton).toBeDisabled();
  });

  it('enables the -5 button when count is 5 or more', () => {
    render(<App />);
    const minusFiveButton = screen.getByRole('button', { name: '-5' });
    const plusFiveButton = screen.getByRole('button', { name: '+5' });

    // Initially disabled
    expect(minusFiveButton).toBeDisabled();

    // Click +5, count becomes 5, button should be enabled
    fireEvent.click(plusFiveButton);
    expect(screen.getByText(/Count: 5/i)).toBeInTheDocument();
    expect(minusFiveButton).not.toBeDisabled();
  });

  it('decrements to 0 when -5 button is clicked from count 5 or more', () => {
    render(<App />);
    const minusFiveButton = screen.getByRole('button', { name: '-5' });
    const plusFiveButton = screen.getByRole('button', { name: '+5' });
    const plusOneButton = screen.getByRole('button', { name: '+1' });


    // Set count to 7 (e.g., +5 then +1 then +1)
    fireEvent.click(plusFiveButton); // Count 5
    fireEvent.click(plusOneButton);  // Count 6
    fireEvent.click(plusOneButton);  // Count 7
    expect(screen.getByText(/Count: 7/i)).toBeInTheDocument();
    expect(minusFiveButton).not.toBeDisabled(); // Ensure it's enabled

    // Click -5, count should become 2
    fireEvent.click(minusFiveButton);
    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument();
    expect(minusFiveButton).toBeDisabled(); // Should be disabled again (2 < 5)

    // Now set count to 5 and test decrementing to 0 exactly
    fireEvent.click(plusFiveButton); // Count 7 -> 12
    fireEvent.click(screen.getByRole('button', { name: 'Reset' })); // Count 0
    fireEvent.click(plusFiveButton); // Count 5
    expect(screen.getByText(/Count: 5/i)).toBeInTheDocument();
    expect(minusFiveButton).not.toBeDisabled();

    // Click -5, count should become 0
    fireEvent.click(minusFiveButton);
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
    expect(minusFiveButton).toBeDisabled(); // Should be disabled
  });
});