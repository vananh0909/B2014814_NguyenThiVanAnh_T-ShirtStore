// import './assets/main.css'
import store from "./assets/js/store"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
createApp(App).use(router).use(VueSweetalert2).use(store).mount('#app')
