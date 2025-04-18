<template>
    <v-app>
      <v-sheet
        elevation="4"
        class="chat-container"
        tile
      >
        <!-- Header -->
        <v-toolbar flat density="comfortable" color="primary" dark>
          <v-btn icon @click="$emit('goBack')">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>AI Chat</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="$emit('closeChat')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
  
        <!-- Messages 主区 -->
        <v-sheet class="chat-main" tile>
          <v-row
            class="fill-height"
            align="center"
            justify="center"
            v-if="!isLoading && messages.length === 0"
          >
            <v-icon size="56">mdi-chat-outline</v-icon>
            <span class="empty-text mt-2">Ask AI about this page</span>
          </v-row>
  
          <div
            v-for="(m, i) in messages"
            :key="i"
            class="d-flex mb-2"
            :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <v-chip
              :color="m.role === 'user' ? 'primary' : 'grey lighten-4'"
              :text-color="m.role === 'user' ? 'white' : 'black'"
              class="message-chip"
              label
            >
              <div>{{ m.content }}</div>
              <small class="d-block text-right">
                {{ formatTime(m.timestamp) }}
              </small>
            </v-chip>
          </div>
  
          <v-row v-if="isLoading">
            <v-skeleton-loader type="text" width="60%" />
          </v-row>
        </v-sheet>
  
        <!-- Footer -->
        <v-divider />
        <v-sheet class="chat-footer" tile>
          <v-textarea
            v-model="newMessage"
            placeholder="Type a message..."
            auto-grow
            rows="1"
            hide-details
            outlined
            @keydown.enter.prevent="sendMessage"
            class="flex-grow-1"
          />
          <v-btn
            :disabled="!newMessage.trim() || isLoading"
            color="primary"
            icon
            @click="sendMessage"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
  
          <v-select
            v-model="model"
            :items="models"
            dense
            hide-details
            class="mx-2"
            style="max-width: 140px;"
          />
  
          <v-btn icon @click="toggleSettings">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-sheet>
  
        <!-- Settings Dialog -->
        <v-dialog v-model="showSettings" max-width="320">
          <v-card>
            <v-card-title>
              Settings
              <v-spacer />
              <v-btn icon @click="toggleSettings">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="apiKey"
                label="API Key"
                type="password"
                outlined
                hide-details
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="toggleSettings">Cancel</v-btn>
              <v-btn color="primary" text @click="saveSettings">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-app>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, watch, nextTick } from 'vue'
  
  interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }
  
  const messages = ref<ChatMessage[]>([])
  const newMessage = ref('')
  const isLoading = ref(false)
  const apiKey = ref('')
  const model = ref('gpt-3.5-turbo')
  const models = ['gpt-4', 'gpt-3.5-turbo']
  const showSettings = ref(false)
  
  const formatTime = (d: Date) =>
    new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(d)
  
  function sendMessage() {
    if (!newMessage.value.trim() || isLoading.value) return
    messages.value.push({
      role: 'user',
      content: newMessage.value.trim(),
      timestamp: new Date()
    })
    newMessage.value = ''
    isLoading.value = true
  
    setTimeout(() => {
      messages.value.push({
        role: 'assistant',
        content: 'Hello! How can I help?',
        timestamp: new Date()
      })
      isLoading.value = false
    }, 800)
  }
  
  function toggleSettings() {
    showSettings.value = !showSettings.value
  }
  
  function saveSettings() {
    // TODO: persist apiKey
    toggleSettings()
  }
  
  onMounted(() => {
    // 可以在這裡初始拿到當前頁面資訊
  })
  
  watch(
    messages,
    () =>
      nextTick(() => {
        const c = document.querySelector('.chat-main')
        if (c) c.scrollTop = c.scrollHeight
      }),
    { deep: true }
  )
  </script>
  
  <style scoped>
  .chat-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
  }
  
  .chat-main {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    background-color: var(--v-theme-surface);
  }
  
  .empty-text {
    color: var(--v-theme-on-surface-disabled);
  }
  
  .message-chip {
    max-width: 75%;
  }
  
  .chat-footer {
    display: flex;
    align-items: center;
    padding: 8px;
    gap: 8px;
  }
  </style>
  