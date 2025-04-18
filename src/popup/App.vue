<!-- src/App.vue -->
<template>
  <ChatSidebar />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChatSidebar from '../components/ChatSidebar.vue';

export default defineComponent({
  name: 'App',
  components: {
    ChatSidebar
  },
  setup() {
    return {};
  }
})
</script>