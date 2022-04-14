<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/history">History</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
      </nav>
  <RouterView />
</template>

<style>
</style>
