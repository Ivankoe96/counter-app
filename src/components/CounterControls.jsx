// src/components/CounterControls.jsx
import { motion } from 'framer-motion';

function CounterControls({ count, onIncrement, onDecrement, onReset }) {
  // Framer Motion variants for button animations
  const buttonVariants = {
    whileTap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <motion.button
        onClick={() => onIncrement(1)}
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-2xl shadow transition-colors"
        whileTap={buttonVariants.whileTap}
      >
        +1
      </motion.button>
      <motion.button
        onClick={() => onDecrement(1)}
        disabled={count === 0}
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors"
        whileTap={buttonVariants.whileTap}
      >
        -1
      </motion.button>
      <motion.button
        onClick={onReset}
        disabled={count === 0}
        className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-2xl shadow transition-colors"
        whileTap={buttonVariants.whileTap}
      >
        Reset
      </motion.button>
      <motion.button
        onClick={() => onIncrement(5)}
        className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded-2xl shadow transition-colors"
        whileTap={buttonVariants.whileTap}
      >
        +5
      </motion.button>
      <motion.button
        onClick={() => onDecrement(5)}
        disabled={count < 5}
        className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors"
        whileTap={buttonVariants.whileTap}
      >
        -5
      </motion.button>
    </div>
  );
}

export default CounterControls;