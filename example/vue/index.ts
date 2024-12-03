import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { Mount } from '../../src/adaptor/vue'
import App from './App.vue'
import 'element-plus/dist/index.css'

const app = createApp(Mount(App))
app.use(ElementPlus)
app.mount('#vue-root')
