import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name equivalent to __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Icon sizes to generate
const iconSizes = [16, 48, 128];

// Create SVG icons with different sizes
iconSizes.forEach((size) => {
    const iconContent = generateSVGIcon(size);
    const filePath = path.join(__dirname, `icon${size}.svg`);
    fs.writeFileSync(filePath, iconContent);
    console.log(`Generated icon${size}.svg`);
});

/**
 * Generate a simple SVG icon with the specified size
 * @param {number} size - The size of the icon
 * @returns {string} - SVG content
 */
function generateSVGIcon(size) {
    // Calculate dimensions based on size
    const strokeWidth = Math.max(1, Math.floor(size / 16));
    const padding = Math.floor(size / 8);
    const innerSize = size - padding * 2;

    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" rx="${Math.floor(size / 8)}" 
    fill="#3b82f6" stroke="#1d4ed8" stroke-width="${strokeWidth}" />
  <path d="M${padding + innerSize / 4} ${padding + innerSize / 2} L${padding + innerSize / 2} ${padding + (innerSize * 3) / 4} L${padding + (innerSize * 3) / 4} ${padding + innerSize / 4}" 
    stroke="white" stroke-width="${strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
}

console.log('All icons generated successfully!');
