import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/styles.css'
import axios from 'axios'

import { useAuthStore } from '@/store/auth' // ← importer le store

const app = createApp(App)

const pinia = createPinia()
app.use(router)
app.use(pinia)

const auth = useAuthStore() // ← on récupère le store
const token = localStorage.getItem('token')

if (token) {
  auth.token = token
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

app.mount('#app')