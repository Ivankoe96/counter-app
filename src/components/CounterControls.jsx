// src/components/CounterControls.jsx
import { motion } from 'framer-motion';

function CounterControls({ count, onIncrement, onDecrement, onReset }) {
  const buttonVariants = {
    whileTap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-wrap justify-center sm:justify-between items-center gap-3">

      {/* Decrement Buttons (-1, -5) */}
      <motion.button
        onClick={() => onDecrement(1)}
        disabled={count === 0}
        className="order-1 sm:order-1 px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors
                   bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
        whileTap={buttonVariants.whileTap}
      >
        -1
      </motion.button>
      <motion.button
        onClick={() => onDecrement(5)}
        disabled={count < 5}
        className="order-3 sm:order-4 px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors
                   bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white"
        whileTap={buttonVariants.whileTap}
      >
        -5
      </motion.button>

      {/* Increment Buttons (+1, +5) */}
      <motion.button
        onClick={() => onIncrement(1)}
        className="order-2 sm:order-2 px-4 py-2 rounded-2xl shadow transition-colors
                   bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
        whileTap={buttonVariants.whileTap}
      >
        +1
      </motion.button>
      <motion.button
        onClick={() => onIncrement(5)}
        className="order-4 sm:order-5 px-4 py-2 rounded-2xl shadow transition-colors
                   bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white"
        whileTap={buttonVariants.whileTap}
      >
        +5
      </motion.button>

      {/* Reset Button */}
      <motion.button
        onClick={onReset}
        disabled={count === 0}
        className="order-5 sm:order-3 px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors
                   bg-slate-500 hover:bg-slate-600 dark:bg-slate-400 dark:hover:bg-slate-500 text-white"
        whileTap={buttonVariants.whileTap}
      >
        Reset
      </motion.button>

    </div>
  );
}

export default CounterControls;