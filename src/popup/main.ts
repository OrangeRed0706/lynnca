import { createApp } from 'vue';
import App from './App.vue';
// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import vuetify from '../plugins/vuetify.ts'

createApp(App).use(vuetify).mount('#app')
