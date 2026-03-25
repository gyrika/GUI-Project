<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="border-b border-slate-200/80 bg-white/90 backdrop-blur">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Bun + Vue 3</p>
        <RouterLink class="text-xl font-semibold tracking-tight text-slate-950 transition hover:text-slate-700" to="/">
          Product Explorer
        </RouterLink>
      </div>

      <nav aria-label="Primary" class="flex flex-wrap items-center gap-2">
        <RouterLink
          class="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
          to="/"
        >
          Products
        </RouterLink>
        <span
          class="rounded-full border border-transparent px-4 py-2 text-sm font-medium text-slate-400"
        >
          Categories
        </span>
        <span
          class="rounded-full border border-transparent px-4 py-2 text-sm font-medium text-slate-400"
        >
          Favorites
        </span>
      </nav>
    </div>
  </header>
</template>
