<template>
  <nav class="navbar">
    <div class="container">
      <RouterLink :to="isAuthenticated ? '/dashboard' : '/'" class="brand">Metrolympiades</RouterLink>
      
      
      <button class="menu-toggle" @click="toggleMenu">
        <span class="hamburger"></span>
      </button>

      
      <ul :class="['nav-links', { active: isMenuOpen }]">
        <li><RouterLink to="/ranking" @click="closeMenu">Classement</RouterLink></li>

        <template v-if="!isAuthenticated">
          <li><RouterLink to="/login" @click="closeMenu">Se connecter</RouterLink></li>
          <li><RouterLink to="/register" @click="closeMenu">S'inscrire</RouterLink></li>
        </template>
        <template v-else>
          <li><RouterLink to="/team" @click="closeMenu">Mon équipe</RouterLink></li>
          <li><RouterLink to="/matches" @click="closeMenu">Mes matchs</RouterLink></li>
          <li><RouterLink to="/new-match" @click="closeMenu">Nouveau match</RouterLink></li>
          <li><button @click="handleLogout">Déconnexion</button></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const isAuthenticated = computed(() => auth.isAuthenticated)


const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background-color: #007bff;
  padding: 1.25rem 2rem;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.brand {
  color: #000;
  font-size: 2rem;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.nav-links li {
  margin: 0;
}

.nav-links a,
.nav-links button {
  color: #000;
  text-decoration: none;
  background: none;
  border: none;
  font: inherit;
  font-size: 1.2rem;
  cursor: pointer;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 10;
}

.hamburger,
.hamburger::before,
.hamburger::after {
  content: '';
  display: block;
  width: 30px;
  height: 3px;
  background: #000;
  transition: 0.3s;
}

.hamburger {
  position: relative;
}

.hamburger::before {
  position: absolute;
  top: -8px;
}

.hamburger::after {
  position: absolute;
  bottom: -8px;
}


.nav-links.active {
  display: block;
  position: absolute;
  top: 60px; 
  left: 0;
  right: 0;
  background-color: #007bff;
  padding: 20px;
  text-align: center;
}

.nav-links.active li {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    width: 100%;
    justify-content: center;
    gap: 1rem;
  }

  .menu-toggle {
    display: block;
  }

  .nav-links.active {
    display: block;
  }

  .menu-toggle.open .hamburger {
    transform: rotate(45deg);
  }
  .menu-toggle.open .hamburger::before {
    transform: translateY(10px) rotate(90deg);
  }
  .menu-toggle.open .hamburger::after {
    transform: translateY(-10px) rotate(90deg);
  }
}
</style>
