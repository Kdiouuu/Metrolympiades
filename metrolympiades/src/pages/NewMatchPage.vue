<template>
  <div class="container" style="max-width:400px;">
    <h1>Nouveau Match</h1>
    <form @submit.prevent="createMatch">
      <div>
        <label for="team2">Équipe adverse</label>
        <select v-model="team2Id" id="team2" class="input">
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="activity">Activité</label>
        <select v-model="activityId" id="activity" class="input">
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">
            {{ activity.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="time">Heure du match</label>
        <input v-model="time" type="datetime-local" id="time" class="input" />
      </div>

      <button class="button">Enregistrer</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const team2Id = ref('')
const activityId = ref('')
const time = ref('')
const teams = ref([])
const activities = ref([])
const router = useRouter()

// Récupère la liste des équipes et des activités disponibles
onMounted(async () => {
  try {
    const teamsResponse = await axios.get('http://localhost:3000/teams', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    teams.value = teamsResponse.data

    const activitiesResponse = await axios.get('http://localhost:3000/activities')
    activities.value = activitiesResponse.data
  } catch (e) {
    console.error('Error fetching teams or activities:', e)
  }
})

async function createMatch() {
  try {
    const matchData = {
      team2Id: team2Id.value,
      activityId: activityId.value,
      startedAt: time.value,
      team1Score: 0,  // Vous pouvez initialiser les scores à 0 par défaut
      team2Score: 0
    }
    await axios.post('http://localhost:3000/matches', matchData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    router.push('/games')  // Redirige vers la page des matchs après la création
  } catch (e) {
    console.error('Error creating match:', e)
  }
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
.button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}
.button:hover {
  background-color: #218838;
}
</style>
