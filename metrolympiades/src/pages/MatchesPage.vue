<template>
  <div class="container">
    <h1>Mes Matchs</h1>
    <ul class="list-group">
      <li v-for="m in matches" :key="m.id" class="list-group-item">
        <div class="match-info">
          <span class="teams">{{ m.team1 }} vs {{ m.team2 }}</span>
          <span class="activity">{{ m.activity }}</span>
        </div>
        <div class="match-details">
          <span class="time">{{ formatDate(m.startedAt) }}</span>
          <span class="score">{{ m.team1Score }} - {{ m.team2Score }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const matches = ref([])

const formatDate = iso => {
  const d = new Date(iso)
  return d.toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })
}

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/matches/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    matches.value = res.data
  } catch (e) {
    console.error(e)
  }
})
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.list-group {
  list-style: none;
  padding: 0;
}
.list-group-item {
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
}
.match-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: bold;
}
.teams {
  color: #333;
}
.activity {
  color: #555;
}
.match-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
}
.score {
  font-weight: bold;
  color: #000;
}
</style>
