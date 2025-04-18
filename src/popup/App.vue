<template>
  <div class="popup-container flex flex-col h-full">
    <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">AI Chat Assistant</h1>
      <button 
        @click="toggleSettings" 
        class="text-white hover:text-blue-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </header>
    
    <main class="flex-grow flex flex-col p-4 overflow-hidden">
      <!-- Settings Panel (conditionally rendered) -->
      <div v-if="showSettings" class="bg-white rounded-lg shadow-md p-4 mb-4 animate-fade-in">
        <h2 class="text-lg font-semibold mb-2">Settings</h2>
        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-bold mb-1">API Key</label>
          <input 
            type="password" 
            v-model="apiKey" 
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your OpenAI API key"
          />
        </div>
        <div class="mb-3">
          <label class="block text-gray-700 text-sm font-bold mb-1">Model</label>
          <select 
            v-model="selectedModel" 
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button 
            @click="saveSettings" 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
      
      <!-- Chat Messages -->
      <div class="flex-grow overflow-y-auto mb-4 space-y-4" ref="chatContainer">
        <div v-if="messages.length === 0" class="flex items-center justify-center h-full">
          <p class="text-gray-500 italic">Start a conversation...</p>
        </div>
        
        <div v-for="(message, index) in messages" :key="index" class="message-container">
          <div 
            :class="[
              'p-3 rounded-lg max-w-[85%]', 
              message.role === 'user' 
                ? 'bg-blue-500 text-white ml-auto' 
                : 'bg-gray-200 text-gray-800'
            ]"
          >
            <p>{{ message.content }}</p>
          </div>
        </div>
        
        <div v-if="isLoading" class="flex items-center space-x-2 p-3 rounded-lg bg-gray-200 text-gray-800 max-w-[85%]">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      <!-- Message Input -->
      <div class="mt-auto">
        <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <textarea 
            v-model="newMessage" 
            @keydown.enter.prevent="sendChatMessage"
            class="flex-grow px-4 py-2 focus:outline-none resize-none"
            placeholder="Type a message..."
            rows="2"
          ></textarea>
          <button 
            @click="sendChatMessage" 
            class="bg-blue-500 hover:bg-blue-700 text-white p-2 h-full"
            :disabled="!newMessage.trim() || isLoading"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </main>
    
    <footer class="bg-gray-100 p-3 text-center text-gray-500 text-sm">
      <p>Vue 3 + TypeScript + Tailwind CSS</p>
      <a 
        @click="openOptions" 
        class="text-blue-500 hover:text-blue-700 cursor-pointer"
      >
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
</style>
