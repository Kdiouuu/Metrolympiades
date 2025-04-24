<template>
  <div class="container">
    <h1>Créer un compte</h1>
    <form @submit.prevent="handleRegister">
      <input
        v-model="form.username"
        type="text"
        placeholder="Nom d'utilisateur"
        class="input"
        required
      />
      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="input"
        required
      />
      <input
        v-model="form.password"
        type="password"
        placeholder="Mot de passe"
        class="input"
        required
      />
      <input
        v-model="form.teamName"
        type="text"
        placeholder="Nom de l'équipe"
        class="input"
        required
      />
      <button type="submit" class="button">S'inscrire</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <p style="margin-top: 1rem;">
      Déjà un compte ?
      <RouterLink to="/login">Connecte-toi</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const form = reactive({
  email: '',
  username: '',
  password: '',
  teamName: '',
})

const error = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleRegister = async () => {
  error.value = ''
  try {
    await authStore.register(form)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Inscription échouée : ' + (err.message || 'Vérifie les champs')
  }
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 2rem auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.input {
  display: block;
  width: 100%;
  padding: 0.8rem;
  margin: 1rem 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.button {
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>
