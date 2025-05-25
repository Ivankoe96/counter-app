// src/App.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from './hooks/useDarkMode'; // Import the useDarkMode hook

function App() {
  const [count, setCount] = useState(0);
  // Use the updated useDarkMode hook that returns a toggle function
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const handleIncrement = (value) => {
    setCount(prevCount => prevCount + value);
  };

  const handleDecrement = (value) => {
    setCount(prevCount => Math.max(0, prevCount - value));
  };

  const handleReset = () => {
    setCount(0);
  };

  // Framer Motion variants for count animation
  const countVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  // Framer Motion variants for button animations
  const buttonVariants = {
    whileTap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <motion.button
        onClick={toggleDarkMode} // Use the new toggleDarkMode function
        className="absolute top-4 right-4 z-10 px-3 py-1 bg-black text-white rounded"
        whileTap={buttonVariants.whileTap}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </motion.button>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className={`w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Counter App
        </h1>

        <div className={`h-12 mb-4 flex justify-center items-center text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={count} // Key ensures AnimatePresence detects changes
              variants={countVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              Count: {count}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <motion.button
            onClick={() => handleIncrement(1)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-2xl shadow transition-colors"
            whileTap={buttonVariants.whileTap}
          >
            +1
          </motion.button>
          <motion.button
            onClick={() => handleDecrement(1)}
            disabled={count === 0}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors"
            whileTap={buttonVariants.whileTap}
          >
            -1
          </motion.button>
          <motion.button
            onClick={handleReset}
            disabled={count === 0}
            className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-2xl shadow transition-colors"
            whileTap={buttonVariants.whileTap}
          >
            Reset
          </motion.button>
          <motion.button
            onClick={() => handleIncrement(5)}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded-2xl shadow transition-colors"
            whileTap={buttonVariants.whileTap}
          >
            +5
          </motion.button>
          <motion.button
            onClick={() => handleDecrement(5)}
            disabled={count < 5}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors"
            whileTap={buttonVariants.whileTap}
          >
            -5
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;