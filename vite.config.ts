import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

// 获取当前目录
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 复制文件的插件
function copyFiles() {
  return {
    name: 'copy-files',
    closeBundle() {
      // 复制并更新 manifest.json
      const manifestPath = path.resolve(__dirname, 'src/manifest.json');
      const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
      const manifest = JSON.parse(manifestContent);

      // 更新 manifest 中的路径
      manifest.action.default_popup = 'src/popup/index.html';
      manifest.options_page = 'src/options/index.html';

      // 写入更新后的 manifest
      const manifestDest = path.resolve(__dirname, 'dist/manifest.json');
      fs.writeFileSync(manifestDest, JSON.stringify(manifest, null, 4));

      // 创建 icons 目录
      const iconsDir = path.resolve(__dirname, 'dist/icons');
      if (!fs.existsSync(iconsDir)) {
        fs.mkdirSync(iconsDir);
      }

      // 复制 SVG 图标并将文件扩展名更改为 PNG（仅重命名，未实际转换格式）
      const iconSizes = [16, 48, 128];
      iconSizes.forEach(size => {
        const srcPath = path.resolve(__dirname, `src/icons/icon${size}.svg`);
        const destPath = path.resolve(__dirname, `dist/icons/icon${size}.png`);
        fs.copyFileSync(srcPath, destPath);
      });
    }
  };
}

export default defineConfig({
  plugins: [vue(), copyFiles()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
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
        sanitizeFileName(name) {
          return name
            .replace(/^\0+/, '')        // 移除 \0 前綴
            .replace(/[:*?"<>|]/g, '')  // 清掉非法字元
            .replace(/^_+/, '');        // 清掉開頭底線
        },
      },
    },
  },
});
