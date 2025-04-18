<template>
  <div class="options-container bg-gray-50 dark:bg-gray-900 min-h-screen">
    <header class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 mb-8 rounded-lg shadow-md">
      <div class="container mx-auto flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h1 class="text-2xl font-bold">Extension Options</h1>
      </div>
    </header>
    
    <main class="container mx-auto px-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </h2>
        
        <div class="space-y-6">
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-3">Notification Style</label>
            <div class="relative">
              <select 
                v-model="settings.notificationStyle" 
                class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none dark:bg-gray-800 dark:text-white"
                @change="saveSettings"
              >
                <option value="minimal">Minimal</option>
                <option value="standard">Standard</option>
                <option value="detailed">Detailed</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Choose how notifications appear on web pages</p>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-3">Notification Settings</label>
            <div class="flex items-center">
              <div class="relative inline-block w-12 mr-3 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="showNotifications" 
                  v-model="settings.showNotifications"
                  @change="saveSettings"
                  class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                />
                <label 
                  for="showNotifications" 
                  class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer"
                ></label>
              </div>
              <label for="showNotifications" class="text-gray-700 dark:text-gray-300">Enable page load notifications</label>
            </div>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Show a notification when the extension is active on a page</p>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-3">Custom Theme</label>
            <div class="grid grid-cols-4 gap-3">
              <div 
                v-for="color in themeColors" 
                :key="color.name"
                class="p-3 rounded-lg cursor-pointer flex flex-col items-center transition-all duration-200 hover:shadow-md"
                :class="{ 'ring-2 ring-offset-2 ring-blue-500 shadow-md': settings.theme === color.value }"
                :style="{ backgroundColor: color.preview }"
                @click="selectTheme(color.value)"
              >
                <span class="mt-1 text-xs font-medium" :class="color.textClass">{{ color.name }}</span>
              </div>
            </div>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Select a theme color for the extension interface</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          About
        </h2>
        <div class="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg border border-gray-200 dark:border-gray-600">
          <div class="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Vue Chrome Extension</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Version 1.0.0</p>
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mb-3">An AI chat assistant built with modern web technologies.</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Built with Vue 3, TypeScript, and Tailwind CSS</p>
          <div class="mt-4 flex space-x-3">
            <a href="#" class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </a>
            <a href="#" class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Documentation
            </a>
          </div>
        </div>
      </div>
      
      <div class="flex justify-between items-center mb-8">
        <button 
          @click="resetSettings" 
          class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset to Defaults
        </button>
        <button 
          @click="saveSettings" 
          class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Save Settings
        </button>
      </div>
    </main>
    
    <div v-if="showSavedMessage" class="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-lg flex items-center animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      Settings saved successfully!
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';

// Reference to Chrome types
/// <reference path="../types/chrome.d.ts" />

interface Settings {
  notificationStyle: string;
  showNotifications: boolean;
  theme: string;
}

export default defineComponent({
  name: 'OptionsPage',
  setup() {
    const showSavedMessage = ref(false);
    
    // Default settings
    const defaultSettings: Settings = {
      notificationStyle: 'standard',
      showNotifications: true,
      theme: 'blue'
    };
    
    // Current settings
    const settings = reactive<Settings>({ ...defaultSettings });
    
    // Theme color options
    const themeColors = [
      { name: 'Blue', value: 'blue', preview: '#3b82f6', textClass: 'text-white' },
      { name: 'Green', value: 'green', preview: '#10b981', textClass: 'text-white' },
      { name: 'Purple', value: 'purple', preview: '#8b5cf6', textClass: 'text-white' },
      { name: 'Red', value: 'red', preview: '#ef4444', textClass: 'text-white' },
      { name: 'Gray', value: 'gray', preview: '#6b7280', textClass: 'text-white' },
      { name: 'Yellow', value: 'yellow', preview: '#f59e0b', textClass: 'text-black' },
      { name: 'Indigo', value: 'indigo', preview: '#4f46e5', textClass: 'text-white' },
      { name: 'Pink', value: 'pink', preview: '#ec4899', textClass: 'text-white' }
    ];
    
    // Load settings on mount
    onMounted(() => {
      loadSettings();
    });
    
    // Load settings from storage
    const loadSettings = () => {
      chrome.storage.sync.get(['settings'], (result) => {
        if (result.settings) {
          Object.assign(settings, result.settings);
        }
      });
    };
    
    // Save settings to storage
    const saveSettings = () => {
      chrome.storage.sync.set({ settings }, () => {
        showSavedMessage.value = true;
        setTimeout(() => {
          showSavedMessage.value = false;
        }, 2000);
      });
    };
    
    // Reset settings to defaults
    const resetSettings = () => {
      Object.assign(settings, defaultSettings);
      saveSettings();
    };
    
    // Select a theme
    const selectTheme = (theme: string) => {
      settings.theme = theme;
      saveSettings();
    };
    
    return {
      settings,
      themeColors,
      showSavedMessage,
      saveSettings,
      resetSettings,
      selectTheme
    };
  }
});
</script>

<style scoped>
/* Custom toggle switch */
.toggle-checkbox:checked {
  transform: translateX(100%);
  border-color: #3b82f6;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #3b82f6;
}

/* Animation */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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
  .dark\:border-gray-600 {
    border-color: #4b5563;
  }
  .dark\:border-gray-700 {
    border-color: #374151;
  }
}
</style>
