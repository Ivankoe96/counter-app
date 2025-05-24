import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = (updateFn) => {
    updateFn();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Counter App</h1>
        <div className="h-12 mb-4 flex justify-center items-center text-xl">
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
            onClick={() => handleClick(() => setCount(count + 1))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl shadow"
          >
            +1
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(() => setCount(Math.max(count - 1, 0)))}
            disabled={count === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl shadow disabled:opacity-50"
          >
            -1
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(() => setCount(0))}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl shadow"
          >
            Reset
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(() => setCount(count + 5))}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl shadow"
          >
            +5
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(() => setCount(Math.max(count - 5, 0)))}
            disabled={count < 5}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl shadow disabled:opacity-50"
          >
            -5
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;
