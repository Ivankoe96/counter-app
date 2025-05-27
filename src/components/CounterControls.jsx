// src/components/CounterControls.jsx
import { motion } from 'framer-motion';

function CounterControls({ count, onIncrement, onDecrement, onReset }) {
  const buttonVariants = {
    whileTap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-wrap justify-center sm:justify-center items-center gap-3">

      {/* Button: -1 */}
      <motion.button
        onClick={() => onDecrement(1)}
        disabled={count === 0}
        // Mobile: 1st | Desktop: 1st
        // NEW COLORS for better contrast with white text
        className="order-1 sm:order-1 px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors
                   bg-blue-800 hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
        whileTap={buttonVariants.whileTap}
      >
        -1
      </motion.button>

      {/* Button: +1 */}
      <motion.button
        onClick={() => onIncrement(1)}
        // Mobile: 2nd | Desktop: 2nd
        // NEW COLORS for better contrast with white text
        className="order-2 sm:order-2 px-4 py-2 rounded-2xl shadow transition-colors
                   bg-blue-800 hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
        whileTap={buttonVariants.whileTap}
      >
        +1
      </motion.button>

      {/* Button: -5 */}
      <motion.button
        onClick={() => onDecrement(5)}
        disabled={count < 5}
        // Mobile: 3rd | Desktop: 4th
        // NEW COLORS for better contrast with white text
        className="order-3 sm:order-4 px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors
                   bg-orange-800 hover:bg-orange-900 dark:bg-orange-700 dark:hover:bg-orange-800 text-white"
        whileTap={buttonVariants.whileTap}
      >
        -5
      </motion.button>

      {/* Button: +5 */}
      <motion.button
        onClick={() => onIncrement(5)}
        // Mobile: 4th | Desktop: 5th
        // NEW COLORS for better contrast with white text
        className="order-4 sm:order-5 px-4 py-2 rounded-2xl shadow transition-colors
                   bg-orange-800 hover:bg-orange-900 dark:bg-orange-700 dark:hover:bg-orange-800 text-white"
        whileTap={buttonVariants.whileTap}
      >
        +5
      </motion.button>

      {/* Reset Button */}
      <motion.button
        onClick={onReset}
        disabled={count === 0}
        // Mobile: 5th (last, so it wraps) | Desktop: 3rd (middle)
        // NEW COLORS for better contrast with white text
        className="order-5 sm:order-3 px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors
                   bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white"
        whileTap={buttonVariants.whileTap}
      >
        Reset
      </motion.button>

    </div>
  );
}

export default CounterControls;