import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Place all modules from node_modules into a 'vendor' chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 9000, // Adjust the chunk size warning limit as needed (e.g., 1 MB)
  },
});
