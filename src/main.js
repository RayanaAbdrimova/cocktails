import { createApp } from 'vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/assets/style/style.scss'
import App from './App.vue'

import { routers } from '@/router'

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus)
app.use(routers)
app.use(pinia)
app.mount('#app')
