// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
import router from './router/router'

createApp(App).use(router).mount('#app')
