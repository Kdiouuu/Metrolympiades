<template>
  <div class="container">
    <div class="flex justify-between items-center mb-4">
      <template v-if="editName">
        <input
          v-model="team.name"
          class="input mr-2"
          placeholder="Nom de l'équipe"
        />
        <button @click="saveTeamName" class="button">💾</button>
      </template>
      <template v-else>
        <h1 class="text-xl font-bold">{{ team?.name || 'Mon Équipe' }}</h1>
        <button @click="editName = true" class="ml-2 text-gray-500 hover:text-gray-700 text-xl">✏️</button>
      </template>
    </div>

    <div v-if="team">
      <div class="flex mb-4">
        <input
          v-model="newMember"
          type="text"
          placeholder="Ajouter un membre"
          class="input"
        />
        <button @click="addMember" class="button ml-2">Ajouter</button>
      </div>
      <ul class="list-group">
        <li
          v-for="(member, index) in team.members"
          :key="index"
          class="list-group-item flex justify-between items-center"
        >
          {{ member }}
          <button @click="removeMember(index)" class="text-red-500">✕</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucune équipe trouvée.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const team = ref(null)
const newMember = ref('')
const editName = ref(false)

async function saveTeamName() {
  editName.value = false
  await updateTeam()
}

async function fetchTeam() {
  try {
    const res = await axios.get('http://localhost:3000/teams/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    team.value = {
      ...res.data,
      members: Array.isArray(res.data.members) ? res.data.members : []
    }
  } catch (error) {
    console.error('Error fetching team:', error)
  }
}

async function updateTeam() {
  try {
    await axios.put(
      'http://localhost:3000/teams/me',
      {
        name: team.value.name,
        members: team.value.members
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  } catch (error) {
    console.error('Error updating team:', error)
  }
}

function addMember() {
  const name = newMember.value.trim()
  if (!name) return
  if (!Array.isArray(team.value.members)) {
    team.value.members = []
  }
  team.value.members.push(name)
  newMember.value = ''
  updateTeam()
}

function removeMember(index) {
  if (!Array.isArray(team.value.members)) return
  team.value.members.splice(index, 1)
  updateTeam()
}

onMounted(fetchTeam)
</script>


<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
.button:hover {
  background-color: #0056b3;
}
.flex {
  display: flex;
}
.ml-2 {
  margin-left: 8px;
}
.mb-4 {
  margin-bottom: 16px;
}
.list-group {
  list-style: none;
  padding: 0;
}
.list-group-item {
  background-color: #f8f9fa;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-red-500 {
  color: #f56565;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}
</style>
