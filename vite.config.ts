import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { Plugin } from 'vite';

// Custom plugin to handle markdown files
function markdown(): Plugin {
  return {
    name: 'markdown',
    transform(code, id) {
      if (!id.endsWith('.md')) return null;
      
      // Export the content as a string
      return {
        code: `export default ${JSON.stringify(code)};`,
        map: null
      };
    }
  };
}
export default defineConfig({
  plugins: [react(), markdown()],
  define: {
    'import.meta.env': JSON.stringify(process.env)
  },
  optimizeDeps: {
    exclude: ['@xenova/transformers']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  envDir: '.'
});