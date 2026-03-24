<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <AppNavbar />
    <main class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <RouterView />
    </main>
  </div>
</template>
