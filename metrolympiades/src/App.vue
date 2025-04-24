<template>
  <div>
    <AppNavbar />
    <router-view class="container" />
  </div>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
</script>