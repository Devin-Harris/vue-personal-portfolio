import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Tooltip from 'vue-directive-tooltip'

createApp(App).use(store).use(Tooltip).use(router).mount('#app')
