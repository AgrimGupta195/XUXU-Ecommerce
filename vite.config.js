import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_PORT || 3000, // or another port like 8080, depending on your deployment provider
    host: '0.0.0.0', // to expose to all network interfaces
  },
});
