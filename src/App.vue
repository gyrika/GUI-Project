<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-slate-900 transition-colors dark:bg-stone-950 dark:text-stone-100">
    <div class="min-h-screen bg-[radial-gradient(circle_at_50%_-20%,_rgba(254,215,170,0.5),_transparent_34%),radial-gradient(circle_at_100%_25%,_rgba(187,247,208,0.35),_transparent_24%)] transition-colors dark:bg-[radial-gradient(circle_at_50%_-20%,_rgba(120,113,108,0.22),_transparent_34%)]">
      <NavBar />
      <main class="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <RouterView />
      </main>
    </div>
  </div>
</template>
