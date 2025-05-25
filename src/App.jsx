import { useState } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useDarkMode();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-4 right-4 z-10 px-3 py-1 bg-black text-white rounded"
      >
        {dark ? 'Light Mode' : 'Dark Mode'}
      </button>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 transition-colors duration-300"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Counter App</h1>
        <div className="h-12 mb-4 flex justify-center items-center text-xl text-gray-900 dark:text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              Count: {count}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCount(prevCount => prevCount + 1)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-2xl shadow transition-colors"
          >
            +1
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCount(prevCount => Math.max(prevCount - 1, 0))}
            disabled={count === 0}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors"
          >
            -1
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCount(0)}
            className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-2xl shadow transition-colors"
          >
            Reset
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCount(prevCount => prevCount + 5)}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded-2xl shadow transition-colors"
          >
            +5
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCount(prevCount => Math.max(prevCount - 5, 0))}
            disabled={count < 5}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded-2xl shadow disabled:opacity-50 transition-colors"
          >
            -5
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;