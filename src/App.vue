<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <AppNavbar />
    <main class="min-h-[calc(100vh-4rem)] px-6 py-10">
      <RouterView />
    </main>
  </div>
</template>
