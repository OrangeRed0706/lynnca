<template>
  <div class="popup-container flex flex-col h-full bg-gray-50 dark:bg-gray-900">
    <header class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <h1 class="text-xl font-bold">AI Chat Assistant</h1>
      </div>
      <button 
        @click="toggleSettings" 
        class="text-white hover:text-blue-200 transition-colors duration-200 rounded-full p-1 hover:bg-white/10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </header>
    
    <main class="flex-grow flex flex-col p-4 overflow-hidden">
      <!-- Settings Panel (conditionally rendered) -->
      <div v-if="showSettings" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 mb-4 animate-fade-in border border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Settings</h2>
          <button @click="toggleSettings" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">API Key</label>
            <div class="relative">
              <input 
                type="password" 
                v-model="apiKey" 
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your OpenAI API key"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Model</label>
            <div class="relative">
              <select 
                v-model="selectedModel" 
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none dark:bg-gray-700 dark:text-white"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button 
            @click="saveSettings" 
            class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Save Settings
          </button>
        </div>
      </div>
      
      <!-- Chat Messages -->
      <div class="flex-grow overflow-y-auto mb-4 space-y-3 px-1" ref="chatContainer">
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p class="text-gray-500 dark:text-gray-400 text-center">Start a conversation with the AI assistant...</p>
          <p class="text-gray-400 dark:text-gray-500 text-sm mt-2">Ask a question or request information</p>
        </div>
        
        <div v-for="(message, index) in messages" :key="index" class="message-container">
          <div 
            :class="[
              'p-3 rounded-lg shadow-sm max-w-[85%]', 
              message.role === 'user' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto' 
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
            ]"
          >
            <p class="whitespace-pre-wrap">{{ message.content }}</p>
            <div 
              :class="[
                'text-xs mt-1 text-right', 
                message.role === 'user' 
                  ? 'text-blue-200' 
                  : 'text-gray-400 dark:text-gray-500'
              ]"
            >
              {{ message.role === 'user' ? 'You' : 'AI Assistant' }}
            </div>
          </div>
        </div>
        
        <div v-if="isLoading" class="flex items-center space-x-2 p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 max-w-[85%] border border-gray-200 dark:border-gray-700 shadow-sm">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 ml-2">AI is thinking...</div>
        </div>
      </div>
      
      <!-- Message Input -->
      <div class="mt-auto">
        <div class="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
          <textarea 
            v-model="newMessage" 
            @keydown.enter.prevent="sendChatMessage"
            class="flex-grow px-4 py-3 focus:outline-none resize-none bg-transparent dark:text-white"
            placeholder="Type a message..."
            rows="2"
          ></textarea>
          <button 
            @click="sendChatMessage" 
            class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-3 h-full transition-colors duration-200"
            :disabled="!newMessage.trim() || isLoading"
            :class="{ 'opacity-50 cursor-not-allowed': !newMessage.trim() || isLoading }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </main>
    
    <footer class="bg-gray-100 dark:bg-gray-800 p-3 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700">
      <p class="mb-1">Vue 3 + TypeScript + Tailwind CSS</p>
      <a 
        @click="openOptions" 
        class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer inline-flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Open Options
      </a>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, nextTick, inject, provide } from 'vue';

// Reference to Chrome types
/// <reference path="../types/chrome.d.ts" />

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Chrome API wrapper for better testability
const createChromeApi = () => {
  // Default implementation using the real Chrome API
  const defaultApi = {
    getTabs: (callback: (tabs: any[]) => void) => {
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.query({ active: true, currentWindow: true }, callback);
      } else {
        callback([{ url: 'https://example.com' }]);
      }
    },
    getStorage: (keys: string[], callback: (result: any) => void) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.sync.get(keys, callback);
      } else {
        callback({});
      }
    },
    setStorage: (items: Record<string, any>, callback?: () => void) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.sync.set(items, callback);
      } else if (callback) {
        callback();
      }
    },
    sendMessage: (message: any, callback?: (response: any) => void) => {
      if (typeof chrome !== 'undefined' && chrome.runtime) {
        chrome.runtime.sendMessage(message, callback);
      } else if (callback) {
        callback({ status: 'ok' });
      }
    },
    addMessageListener: (callback: (message: any, sender: any, sendResponse: (response?: any) => void) => boolean | void) => {
      if (typeof chrome !== 'undefined' && chrome.runtime) {
        chrome.runtime.onMessage.addListener(callback);
      }
    },
    openOptionsPage: () => {
      if (typeof chrome !== 'undefined' && chrome.runtime) {
        chrome.runtime.openOptionsPage();
      }
    }
  };

  return defaultApi;
};

// Create a symbol for providing/injecting the Chrome API
const ChromeApiSymbol = Symbol('chromeApi');

// Provide the Chrome API to components
export const provideChromeApi = (api = createChromeApi()) => {
  provide(ChromeApiSymbol, api);
  return api;
};

export default defineComponent({
  name: 'PopupApp',
  props: {
    // Add a prop for testing purposes
    testChromeApi: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    // Get the Chrome API, or create a default one if not provided
    const chromeApi = props.testChromeApi || inject(ChromeApiSymbol, createChromeApi());
    
    const currentUrl = ref('');
    const messages = ref<ChatMessage[]>([]);
    const newMessage = ref('');
    const isLoading = ref(false);
    const chatContainer = ref<HTMLElement | null>(null);
    const showSettings = ref(false);
    const apiKey = ref('');
    const selectedModel = ref('gpt-3.5-turbo');
    
    // Load settings from storage
    onMounted(async () => {
      // Get the current tab URL
      chromeApi.getTabs((tabs: any[]) => {
        if (tabs[0]?.url) {
          currentUrl.value = tabs[0].url;
        }
      });
      
      // Load settings from storage
      chromeApi.getStorage(['apiKey', 'model', 'chatHistory'], (result: any) => {
        if (result.apiKey) {
          apiKey.value = result.apiKey;
        }
        
        if (result.model) {
          selectedModel.value = result.model;
        }
        
        if (result.chatHistory) {
          try {
            messages.value = JSON.parse(result.chatHistory);
          } catch (e) {
            console.error('Failed to parse chat history:', e);
          }
        }
      });
      
      // Listen for messages
      chromeApi.addMessageListener((message: any, sender: any, sendResponse: any) => {
        if (message.action === 'aiResponse') {
          messages.value.push({
            role: 'assistant',
            content: message.content
          });
          isLoading.value = false;
          saveChatHistory();
        }
        sendResponse({ status: "Popup received message" });
        return true; // Keep the message channel open
      });
    });
    
    // Save settings to storage
    const saveSettings = () => {
      chromeApi.setStorage({
        apiKey: apiKey.value,
        model: selectedModel.value
      }, () => {
        showSettings.value = false;
      });
    };
    
    // Toggle settings panel
    const toggleSettings = () => {
      showSettings.value = !showSettings.value;
    };
    
    // Save chat history to storage
    const saveChatHistory = () => {
      chromeApi.setStorage({
        chatHistory: JSON.stringify(messages.value)
      });
    };
    
    // Send a chat message
    const sendChatMessage = () => {
      if (!newMessage.value.trim() || isLoading.value) return;
      
      // Add user message to chat
      messages.value.push({
        role: 'user',
        content: newMessage.value
      });
      
      // Clear input
      const messageToSend = newMessage.value;
      newMessage.value = '';
      
      // Show loading indicator
      isLoading.value = true;
      
      // In a real implementation, this would call the OpenAI API
      // For now, we'll simulate a response after a delay
      setTimeout(() => {
        // This is a placeholder. In the future, this would be replaced with an actual API call
        chromeApi.sendMessage(
          { 
            action: "chatMessage", 
            content: messageToSend,
            model: selectedModel.value
          },
          (response: any) => {
            // The actual response will come through the message listener
            if (!response) {
              isLoading.value = false;
              messages.value.push({
                role: 'assistant',
                content: "I'm sorry, there was an error processing your request."
              });
              saveChatHistory();
            }
          }
        );
      }, 500);
      
      saveChatHistory();
    };
    
    // Scroll to bottom when messages change
    watch(messages, () => {
      nextTick(() => {
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
      });
    }, { deep: true });
    
    // Open the options page
    const openOptions = () => {
      chromeApi.openOptionsPage();
    };
    
    return {
      currentUrl,
      messages,
      newMessage,
      isLoading,
      chatContainer,
      showSettings,
      apiKey,
      selectedModel,
      sendChatMessage,
      openOptions,
      toggleSettings,
      saveSettings
    };
  }
});
</script>

<style scoped>
.popup-container {
  height: 500px;
  width: 350px;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.typing-indicator {
  display: flex;
  align-items: center;
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  margin: 0 2px;
  background-color: #9ca3af;
  border-radius: 50%;
  display: inline-block;
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Add support for dark mode */
@media (prefers-color-scheme: dark) {
  .dark\:bg-gray-700 {
    background-color: #374151;
  }
  .dark\:bg-gray-800 {
    background-color: #1f2937;
  }
  .dark\:bg-gray-900 {
    background-color: #111827;
  }
  .dark\:text-white {
    color: #ffffff;
  }
  .dark\:text-gray-200 {
    color: #e5e7eb;
  }
  .dark\:text-gray-300 {
    color: #d1d5db;
  }
  .dark\:text-gray-400 {
    color: #9ca3af;
  }
  .dark\:text-gray-500 {
    color: #6b7280;
  }
  .dark\:border-gray-600 {
    border-color: #4b5563;
  }
  .dark\:border-gray-700 {
    border-color: #374151;
  }
}
</style>
