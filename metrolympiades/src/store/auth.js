import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async register({ email, username, password, teamName }) {
      const response = await axios.post('http://localhost:3000/auth/register', {
        email, username, password, teamName,
      })

      const userData = response.data
      this.user = userData
      this.token = userData.token

      localStorage.setItem('token', userData.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    },
    async login({ email, password }) {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email, password,
      })

      const userData = response.data
      this.user = userData
      this.token = userData.token

      localStorage.setItem('token', userData.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
  },
})
