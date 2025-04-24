<template>
  <div class="ranking-page">
    <h1>Classement des Équipes</h1>

    <div v-if="teams.length" class="ranking-list">
      <div
        v-for="(team, index) in teams"
        :key="index"
        class="ranking-item"
      >
        <span class="rank">#{{ index + 1 }}</span>
        <span class="team-name">{{ team.team }}</span>
        <span class="points">{{ team.points }} pts</span>
      </div>
    </div>

    <div v-else class="empty">
      Aucun classement disponible.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const teams = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/ranking')
    teams.value = res.data
  } catch (error) {
    console.error('Erreur récupération classement:', error)
  }
})
</script>

<style scoped>
.ranking-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

h1 {
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2rem;
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ranking-item {
  display: flex;
  justify-content: space-between;
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.rank {
  font-weight: bold;
  color: #6366f1;
}

.team-name {
  font-weight: 600;
}

.points {
  font-weight: bold;
  color: #10b981;
}

.empty {
  text-align: center;
  font-style: italic;
  color: #888;
}
</style>