<template>
  <nav class="navbar">
    <div class="container" style="display:flex; align-items:center; justify-content:space-between;">
      <div class="brand">
        <RouterLink :to="isAuthenticated ? '/dashboard' : '/' " class="brand">Metrolympiades</RouterLink>
      </div>

      <ul>
        <li><RouterLink to="/ranking">Classement</RouterLink></li>

        <template v-if="!isAuthenticated">
          <li><RouterLink to="/login">Se connecter</RouterLink></li>
          <li><RouterLink to="/register">S'inscrire</RouterLink></li>
        </template>

        <template v-else>
          <li><RouterLink to="/team">Mon équipe</RouterLink></li>
          <li><RouterLink to="/matches">Mes matchs</RouterLink></li>
          <li><RouterLink to="/new-match">Nouveau match</RouterLink></li>
          <li><button @click="handleLogout">Déconnexion</button></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const isAuthenticated = computed(() => auth.isAuthenticated)

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>