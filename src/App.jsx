// src/App.jsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from './hooks/useDarkMode';
import { useCounter } from './hooks/useCounter';
import CounterControls from './components/CounterControls';

function App() {
  const [count, increment, decrement, reset] = useCounter(0);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const countVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    // Main container - NEW background colors
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900' // Darker gray background, lighter text for dark mode
      }`}
    >
      {/* Dark Mode Toggle Button - NEW colors */}
      <motion.button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 z-10 px-3 py-1 rounded-full text-sm font-medium shadow-md
          ${isDarkMode
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' // Dark mode button colors
            : 'bg-gray-300 hover:bg-gray-400 text-gray-800' // Light mode button colors
          }
          transition-colors duration-300
        `}
        whileTap={{ scale: 0.95 }}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </motion.button>

      {/* Main Counter Card - NEW background colors */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className={`w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-white' // Darker card background, white for light mode
        }`}
      >
        <h1 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Counter App
        </h1>

        <div className={`h-12 mb-4 flex justify-center items-center text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
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

        <CounterControls
          count={count}
          onIncrement={increment}
          onDecrement={decrement}
          onReset={reset}
        />
      </motion.div>
    </motion.div>
  );
}

export default App;