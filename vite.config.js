import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@tinymce/tinymce-react', 'tinymce', 'react-quill'], 
  },
  build: {
    rollupOptions: {
      external: ['react-quill/dist/quill.snow.css'], 
    },
  },
  assetsInclude: ['**/*.JPG', '**/*.jpg'], 
});
