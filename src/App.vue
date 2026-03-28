<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <div class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(241,245,249,1)_55%)] transition-colors dark:bg-[radial-gradient(circle_at_top,_rgba(30,41,59,0.75),_rgba(2,6,23,1)_55%)]">
      <NavBar />
      <main class="mx-auto w-full max-w-6xl px-5 py-8 sm:px-6 sm:py-10">
        <RouterView />
      </main>
    </div>
  </div>
</template>
