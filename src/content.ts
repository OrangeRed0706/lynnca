// src/content.ts
import { createApp } from 'vue';
import App from './popup/App.vue';

const sidebar = document.createElement('div');
sidebar.id = 'lynnca-sidebar';
Object.assign(sidebar.style, {
  position: 'fixed',
  top: '0',
  right: '0',
  width: '370px',
  height: '100%',
  zIndex: '999999',
  boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
  background: 'transparent'  // 实际背景由组件自己控制
});
document.body.appendChild(sidebar);

createApp(App).mount('#monica-sidebar');
