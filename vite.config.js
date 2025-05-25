import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss'; // Import tailwindcss for PostCSS

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()], // Keep this for Tailwind CSS v3 integration
    },
  },
  // --- Vitest Configuration ---
  test: {
    globals: true, // Makes test utilities like 'describe', 'it', 'expect' globally available
    environment: 'jsdom', // Simulates a browser DOM environment
    setupFiles: './src/setupTests.js', // Path to a file to run before each test suite
    css: true, // Tells Vitest to process CSS imports (important for Tailwind)
  },
});