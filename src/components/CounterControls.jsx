// src/components/CounterControls.jsx
import { motion } from 'framer-motion';

function CounterControls({ count, onIncrement, onDecrement, onReset }) {
  const buttonVariants = {
    whileTap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-wrap justify-center sm:justify-between items-center gap-3">

      
      <motion.button
        onClick={() => onDecrement(1)}
        disabled={count === 0}
        className="order-1 sm:order-1 px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors
                   bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
        whileTap={buttonVariants.whileTap}
      >
        -1
      </motion.button>
      <motion.button
        onClick={() => onDecrement(5)}
        disabled={count < 5}
        className="order-3 sm:order-4 px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors
                   bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white"
        whileTap={buttonVariants.whileTap}
      >
        -5
      </motion.button>

      {/* Increment Buttons (+1, +5) */}
      <motion.button
        onClick={() => onIncrement(1)}
        // Corrected order for visual: Increments are 4th and 5th on desktop, 3rd and 4th on mobile (after decrements)
        className="order-2 sm:order-2 px-4 py-2 rounded-2xl shadow transition-colors
                   bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
        whileTap={buttonVariants.whileTap}
      >
        +1
      </motion.button>
      <motion.button
        onClick={() => onIncrement(5)}
        // Corrected order for visual: Increments are 4th and 5th on desktop, 3rd and 4th on mobile (after decrements)
        className="order-4 sm:order-5 px-4 py-2 rounded-2xl shadow transition-colors
                   bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white"
        whileTap={buttonVariants.whileTap}
      >
        +5
      </motion.button>

      {/* Reset Button */}
      <motion.button
        onClick={onReset}
        disabled={count === 0}
        // Corrected order for visual: On mobile, it's order-5 (last, so it wraps). On desktop, it's order-3 (middle).
        className="order-5 sm:order-3 px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors
                   bg-gray-500 hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-500 text-white"
        whileTap={buttonVariants.whileTap}
      >
        Reset
      </motion.button>

    </div>
  );
}

export default CounterControls;