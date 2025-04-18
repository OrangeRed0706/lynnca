# Vue Chrome Extension

A Chrome extension built with Vue 3, TypeScript, and Tailwind CSS.

## Features

- Popup UI with Vue 3 and Tailwind CSS
- Options page for extension settings
- Background script for event handling
- Content script that injects into web pages
- Chrome storage API integration
- Message passing between components

## Project Structure

- `src/`: Source code
  - `background.ts`: Background script
  - `content.ts`: Content script
  - `manifest.json`: Extension manifest
  - `popup/`: Popup UI
  - `options/`: Options page
  - `icons/`: Extension icons
  - `types/`: TypeScript type definitions

## Development

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development Commands

- Run development server:

```bash
npm run dev
```

- Build the extension:

```bash
npm run build
```

- Package the extension into a zip file:

```bash
npm run package
```

## Detailed Deployment Steps

### Local Development Deployment

1. Build the extension:

```bash
npm run build
```

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the `dist` directory
5. The extension should now be loaded and visible in your browser

### Chrome Web Store Deployment

1. Package the extension:

```bash
npm run package
```

2. Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
3. Sign in with your Google account
4. Click "New Item" and upload the `extension.zip` file
5. Fill in the required information:
   - Description
   - Screenshots (at least one 1280x800 or 640x400)
   - Promotional images (optional)
   - Category selection
   - Language
6. Pay the one-time developer fee ($5 USD) if you haven't already
7. Submit for review
8. Wait for approval (typically 1-3 business days)

### Enterprise Deployment

For enterprise deployment, you can distribute the extension through:

1. Chrome Enterprise policies
2. Host the extension on your own server and use the Chrome Enterprise policy to install it
3. Use the Chrome Web Store private publishing option

## Usage Instructions

### For Users

1. After installing the extension, you'll see the extension icon in your Chrome toolbar
2. Click the icon to open the popup interface
3. The popup shows the current URL and allows you to send test messages
4. Click "Open Options" at the bottom of the popup to access the options page
5. In the options page, you can:
   - Change notification style
   - Toggle notifications on/off
   - Select a custom theme color

### For Developers

#### Modifying the Popup UI

1. Edit files in `src/popup/` directory
2. The main component is in `src/popup/App.vue`
3. Styles are managed through Tailwind CSS classes

#### Modifying the Options Page

1. Edit files in `src/options/` directory
2. The main component is in `src/options/Options.vue`
3. Settings are stored using Chrome's storage API

#### Modifying the Content Script

1. Edit `src/content.ts` to change how the extension interacts with web pages
2. The content script currently shows a notification when loaded on a page

#### Modifying the Background Script

1. Edit `src/background.ts` to change background behavior
2. The background script handles events and messaging between components

## Troubleshooting

- If you encounter permission issues with build scripts, run:

  ```bash
  chmod +x node_modules/.bin/vue-tsc
  ```

- If Tailwind CSS isn't working, make sure you have the correct PostCSS configuration:

  ```bash
  npm install --save-dev @tailwindcss/postcss
  ```

- If Chrome doesn't recognize the extension, check that:
  1. The manifest.json is correctly formatted
  2. All paths in the manifest.json are correct
  3. The dist directory contains all necessary files

## License

MIT
