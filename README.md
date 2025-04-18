# Vue Chrome Extension

A Chrome extension built with Vue 3, TypeScript, and Tailwind CSS that provides an AI chat assistant interface.

## Technologies

- **Frontend**: Vue 3, TypeScript, Tailwind CSS, Naive UI
- **State Management**: Pinia
- **Build Tools**: Vite, vue-tsc
- **Testing**: Vitest (unit tests), Playwright (e2e tests)
- **Chrome Extension**: Manifest V3
- **Packaging**: Archiver

## Project Structure

```
├── e2e/                    # End-to-end tests using Playwright
├── public/                 # Public assets
├── src/                    # Source code
│   ├── background.ts       # Background service worker
│   ├── content.ts          # Content script injected into web pages
│   ├── manifest.json       # Chrome extension manifest
│   ├── tailwind.css        # Tailwind CSS configuration
│   ├── icons/              # Extension icons
│   │   ├── icon16.svg      # 16x16 icon
│   │   ├── icon48.svg      # 48x48 icon
│   │   └── icon128.svg     # 128x128 icon
│   ├── options/            # Options page
│   │   ├── index.html      # Options page HTML
│   │   ├── main.ts         # Options page entry point
│   │   └── Options.vue     # Options page component
│   ├── popup/              # Popup UI
│   │   ├── index.html      # Popup HTML
│   │   ├── main.ts         # Popup entry point
│   │   └── App.vue         # Popup component
│   └── types/              # TypeScript type definitions
│       ├── chrome.d.ts     # Chrome API types
│       ├── css.d.ts        # CSS module types
│       └── vue.d.ts        # Vue types
├── tests/                  # Unit tests
│   └── unit/               # Unit tests using Vitest
│       └── ChatPanel.spec.ts # Chat panel component test
├── index.html              # Development entry point
├── package.json            # Project dependencies and scripts
├── playwright.config.ts    # Playwright configuration
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── vitest.config.ts        # Vitest configuration
└── zip-extension.js        # Script to package the extension
```

## Features

- **AI Chat Interface**: A popup UI that allows users to chat with an AI assistant
- **Settings Management**: Options page for configuring API keys, model selection, and UI preferences
- **Background Processing**: Background service worker that handles AI message processing
- **Web Page Integration**: Content script that shows a notification when the extension is active
- **Chrome Storage**: Persistent storage for settings and chat history
- **Message Passing**: Communication between different parts of the extension

## Development Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd vue-chrome-extension

# Install dependencies
npm install
```

### Development Commands

```bash
# Start development server
npm run dev

# Run unit tests
npm run test:unit

# Run unit tests in watch mode
npm run test:unit:watch

# Run end-to-end tests
npm run test:e2e

# Run all tests
npm run test

# Build the extension
npm run build

# Create a zip file of the extension
npm run zip

# Build and package the extension
npm run package
```

## Local Development

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in the top-right corner)

4. Click "Load unpacked" and select the `dist` directory (or `dev-dist` during development)

5. The extension should now be loaded and visible in your browser

## Testing

### Unit Tests

Unit tests are written using Vitest and Vue Test Utils. They test individual components in isolation.

```bash
# Run unit tests
npm run test:unit

# Run unit tests in watch mode
npm run test:unit:watch
```

### End-to-End Tests

End-to-end tests are written using Playwright. They test the application as a whole, simulating user interactions.

```bash
# Run end-to-end tests
npm run test:e2e
```

## Extension Structure

### Popup

The popup is the main UI that appears when clicking the extension icon. It provides a chat interface where users can:

- Send messages to the AI assistant
- View responses
- Configure settings (API key, model selection)

### Options Page

The options page provides additional configuration options:

- Notification style
- Toggle notifications on/off
- Theme color selection

### Background Script

The background script runs in the background and:

- Processes chat messages
- Simulates AI responses (currently with placeholder responses)
- Communicates with the popup and content script

### Content Script

The content script is injected into web pages and:

- Shows a notification that the extension is active
- Communicates with the background script

## Building and Packaging

```bash
# Build the extension
npm run build

# Package the extension into a zip file
npm run package
```

The build process:

1. Compiles TypeScript files
2. Bundles the application with Vite
3. Copies and updates the manifest.json
4. Copies and renames icon files

The packaging process:

1. Builds the extension
2. Creates a zip file of the dist directory

## Chrome Extension APIs Used

- **chrome.runtime**: For message passing between different parts of the extension
- **chrome.storage**: For storing settings and chat history
- **chrome.tabs**: For accessing the current tab information

## Future Enhancements

- Implement actual OpenAI API integration
- Add more AI models
- Improve UI/UX
- Add more customization options
- Implement context-aware suggestions based on the current web page
