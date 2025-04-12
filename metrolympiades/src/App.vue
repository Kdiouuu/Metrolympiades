<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToProfile() {
  router.push("/");
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <button @click="goToProfile">Go to Profile</button>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
