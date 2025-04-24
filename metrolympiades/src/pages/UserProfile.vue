<template>
  <div class="container" style="max-width:400px;">
    <h1>Mon Profil</h1>
    <p><strong>Nom :</strong> {{ user.name }}</p>
    <p><strong>Email :</strong> {{ user.email }}</p>
    <button @click="editProfile" class="button">Éditer le profil</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref({})

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/user/profile')
  user.value = res.data
})

function editProfile() {
  alert('À implémenter')
}
</script>