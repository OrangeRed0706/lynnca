<template>
  <div class="options-container">
    <header class="bg-blue-600 text-white p-4 mb-6 rounded">
      <h1 class="text-2xl font-bold">Extension Options</h1>
    </header>
    
    <main>
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Settings</h2>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Notification Style</label>
          <select 
            v-model="settings.notificationStyle" 
            class="w-full p-2 border border-gray-300 rounded"
            @change="saveSettings"
          >
            <option value="minimal">Minimal</option>
            <option value="standard">Standard</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Show Notifications</label>
          <div class="flex items-center">
            <input 
              type="checkbox" 
              id="showNotifications" 
              v-model="settings.showNotifications"
              @change="saveSettings"
              class="mr-2"
            />
            <label for="showNotifications">Enable page load notifications</label>
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Custom Theme</label>
          <div class="grid grid-cols-4 gap-2">
            <div 
              v-for="color in themeColors" 
              :key="color.name"
              class="p-2 rounded cursor-pointer flex flex-col items-center"
              :class="{ 'ring-2 ring-blue-500': settings.theme === color.value }"
              :style="{ backgroundColor: color.preview }"
              @click="selectTheme(color.value)"
            >
              <span class="mt-1 text-xs" :class="color.textClass">{{ color.name }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">About</h2>
        <div class="bg-gray-100 p-4 rounded">
          <p class="mb-2">Vue Chrome Extension</p>
          <p class="text-sm text-gray-600">Version 1.0.0</p>
          <p class="text-sm text-gray-600 mt-2">Built with Vue 3, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
      
      <div class="mt-4 text-right">
        <button 
          @click="resetSettings" 
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Reset to Defaults
        </button>
        <button 
          @click="saveSettings" 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Settings
        </button>
      </div>
    </main>
    
    <div v-if="showSavedMessage" class="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded shadow-lg">
      Settings saved successfully!
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';

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
