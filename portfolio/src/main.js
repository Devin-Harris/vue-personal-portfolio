import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Tooltip from 'vue-directive-tooltip'
import Vue3TouchEvents from "vue3-touch-events";

const app = createApp(App)
app.use(store).use(Tooltip).use(Vue3TouchEvents).use(router)
app.mount('#app')
export default app
