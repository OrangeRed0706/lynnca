import { createApp } from 'vue';
import Options from './Options.vue';
import vuetify from '../plugins/vuetify'

// Create and mount the Vue app
const app = createApp(Options);
app.use(vuetify);
app.mount('#app');
