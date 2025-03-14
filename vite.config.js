import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_PORT || 3000, // Use VITE_PORT from environment variables or default to 3000
    host: '0.0.0.0', // Expose to all network interfaces
    allowedHosts: ['xuxu-ecommerce.onrender.com'], // Add the allowed host here
  },
});
