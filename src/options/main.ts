import { createApp } from 'vue';
import Options from './Options.vue';
import '../tailwind.css';

// Create and mount the Vue app
const app = createApp(Options);
app.mount('#app');
