import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@tinymce/tinymce-react', 'tinymce', 'react-quill'], // react-quill eklendi
  },
  build: {
    rollupOptions: {
      external: ['react-quill/dist/quill.snow.css'], // CSS dosyasını harici olarak işaretle
    },
  },
  assetsInclude: ['**/*.JPG', '**/*.jpg'], // JPG uzantılı dosyalar dahil
});
