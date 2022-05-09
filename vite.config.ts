import { defineConfig } from 'vite'
export default defineConfig({
  define: {
    "global": {},
    'process.env': process.env
  },
});