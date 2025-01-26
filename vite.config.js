import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',  
    assetsDir: 'assets', 
    rollupOptions: {
      input: 'src/index.html',  
    },
  },
});
