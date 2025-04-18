import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

// Get the directory name equivalent to __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to copy files during build
function copyFiles() {
  return {
    name: 'copy-files',
    closeBundle() {
      // Copy and update manifest.json
      const manifestPath = path.resolve(__dirname, 'src/manifest.json');
      const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
      const manifest = JSON.parse(manifestContent);
      
      // Update paths in manifest
      manifest.action.default_popup = 'src/popup/index.html';
      manifest.options_page = 'src/options/index.html';
      
      // Write updated manifest
      const manifestDest = path.resolve(__dirname, 'dist/manifest.json');
      fs.writeFileSync(manifestDest, JSON.stringify(manifest, null, 4));
      
      // Create icons directory
      const iconsDir = path.resolve(__dirname, 'dist/icons');
      if (!fs.existsSync(iconsDir)) {
        fs.mkdirSync(iconsDir);
      }
      
      // Copy SVG icons and convert file extension to PNG in the filename
      // (We're not actually converting the format, just renaming for this example)
      const iconSizes = [16, 48, 128];
      iconSizes.forEach(size => {
        const srcPath = path.resolve(__dirname, `src/icons/icon${size}.svg`);
        const destPath = path.resolve(__dirname, `dist/icons/icon${size}.png`);
        fs.copyFileSync(srcPath, destPath);
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    copyFiles(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        background: 'src/background.ts',
        content: 'src/content.ts',
        popup: 'src/popup/index.html',
        options: 'src/options/index.html',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
