<template>
  <div class="dashboard">
    <h1>Bienvenue, {{ user?.username }} 👋</h1>

    <section v-if="user" class="card">
      <h2>Infos Utilisateur</h2>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <p><strong>Équipe :</strong> {{ user.team?.name }}</p>
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const auth = useAuthStore()
const router = useRouter()

const user = auth.user

onMounted(() => {
 
  if (!auth.token || !auth.user) {
    router.push('/login')
  }
})
</script>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
}

.card {
  background: #f3f4f6;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.logout-btn {
  background: #ef4444;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #dc2626;
}
</style>
