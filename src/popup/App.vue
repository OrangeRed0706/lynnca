<template>
  <div class="popup-container">
    <header class="bg-blue-600 text-white p-4">
      <h1 class="text-xl font-bold">Vue Chrome Extension</h1>
    </header>
    
    <main class="p-4">
      <div class="mb-4">
        <p class="text-gray-700">Current URL:</p>
        <p class="text-sm bg-gray-100 p-2 rounded">{{ currentUrl }}</p>
      </div>
      
      <div class="mb-4">
        <button 
          @click="sendMessage" 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send Test Message
        </button>
      </div>
      
      <div v-if="messageResponse" class="mt-4">
        <p class="text-gray-700">Response:</p>
        <pre class="text-sm bg-gray-100 p-2 rounded">{{ messageResponse }}</pre>
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
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'PopupApp',
  setup() {
    const currentUrl = ref('');
    const messageResponse = ref('');
    
    onMounted(async () => {
      // Get the current tab URL
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url) {
          currentUrl.value = tabs[0].url;
        }
      });
      
      // Listen for messages
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        messageResponse.value = JSON.stringify(message, null, 2);
        sendResponse({ status: "Popup received message" });
        return true; // Keep the message channel open
      });
    });
    
    // Send a message to the background script
    const sendMessage = () => {
      chrome.runtime.sendMessage(
        { 
          action: "popupButtonClicked", 
          timestamp: new Date().toISOString() 
        },
        (response) => {
          if (response) {
            messageResponse.value = JSON.stringify(response, null, 2);
          }
        }
      );
    };
    
    // Open the options page
    const openOptions = () => {
      chrome.runtime.openOptionsPage();
    };
    
    return {
      currentUrl,
      messageResponse,
      sendMessage,
      openOptions
    };
  }
});
</script>
