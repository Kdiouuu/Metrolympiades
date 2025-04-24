import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import DashboardPage from './pages/DashboardPage.vue'
import MatchesPage from './pages/MatchesPage.vue'
import NewMatchPage from './pages/NewMatchPage.vue'
import TeamPage from './pages/TeamPage.vue'
import UserProfile from './pages/UserProfile.vue'
import RankingPages from './pages/RankingPages.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/matches', component: MatchesPage },
  { path: '/new-match', component: NewMatchPage },
  { path: '/team', component: TeamPage },
  { path: '/profile', component: UserProfile },
  { path: '/ranking', component: RankingPages }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router