import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from './hooks/useDarkMode';
import { useCounter } from './hooks/useCounter';
import CounterControls from './components/CounterControls';

function App() {
  const [count, increment, decrement, reset] = useCounter(0); // <--- USE THE CUSTOM HOOK

  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const countVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
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
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 z-10 px-3 py-1 bg-black text-white rounded"
        whileTap={{ scale: 0.95 }}
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
          onIncrement={increment} // <--- Use functions from the hook
          onDecrement={decrement} // <--- Use functions from the hook
          onReset={reset}         // <--- Use functions from the hook
        />
      </motion.div>
    </motion.div>
  );
}

export default App;