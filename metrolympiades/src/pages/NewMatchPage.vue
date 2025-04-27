<template>
  <div class="container">
    <h1>Nouveau Match</h1>
    <form @submit.prevent="createMatch">
      <div>
        <label for="team2">Équipe adverse</label>
        <select v-model="team2Id" id="team2" class="input">
          <option v-for="team in filteredTeams" :key="team.id" :value="team.id">
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
        <label for="time">Date et heure du match</label>
        <input v-model="time" type="datetime-local" id="time" class="input" />
      </div>

      <div>
        <label for="team1Score">Score de mon équipe</label>
        <input v-model.number="team1Score" type="number" min="0" class="input" />
      </div>

      <div>
        <label for="team2Score">Score de l'équipe adverse</label>
        <input v-model.number="team2Score" type="number" min="0" class="input" />
      </div>

      <button class="button">Enregistrer</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const team2Id = ref('')
const activityId = ref('')
const time = ref('')
const team1Score = ref(0)
const team2Score = ref(0)
const teams = ref([])
const activities = ref([])
const myTeamId = ref('')
const router = useRouter()

const filteredTeams = computed(() => teams.value.filter(team => team.id !== myTeamId.value))

onMounted(async () => {
  try {
    const teamRes = await axios.get('http://localhost:3000/teams/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    myTeamId.value = teamRes.data.id

    const teamsResponse = await axios.get('http://localhost:3000/teams', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    teams.value = teamsResponse.data

    const activitiesResponse = await axios.get('http://localhost:3000/activities')
    activities.value = activitiesResponse.data
  } catch (e) {
    console.error('Erreur lors du chargement :', e)
  }
})

async function createMatch() {
  try {
    if (!team2Id.value || !activityId.value || !time.value) {
      alert('Merci de remplir tous les champs !')
      return
    }

    if (team2Id.value === myTeamId.value) {
      alert("Tu ne peux pas jouer contre ta propre équipe !")
      return
    }

    const matchData = {
      team2Id: team2Id.value,
      activityId: activityId.value,
      startedAt: new Date(time.value).toISOString(),
      team1Score: team1Score.value,
      team2Score: team2Score.value
    }

    console.log('Données envoyées :', matchData)

    await axios.post('http://localhost:3000/matches', matchData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })

    alert('Match créé avec succès !')
    router.push('/matches')

  } catch (e) {
    if (e.response && e.response.data.message === "Match already exists") {
      alert('Tu as déjà un match contre cette équipe pour cette activité.')
    } else {
      console.error('Erreur lors de la création du match :', e)
    }
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
