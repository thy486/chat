import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'normalize.css/normalize.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(Antd)
app.mount('#app')
