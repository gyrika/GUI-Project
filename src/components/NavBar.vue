<script setup lang="ts">
import { RouterLink } from 'vue-router'

import ThemeToggle from '@/components/ThemeToggle.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-stone-200/80 bg-stone-50/85 backdrop-blur-xl transition-colors dark:border-stone-800 dark:bg-stone-950/85">
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <RouterLink class="group flex items-center justify-center gap-3 sm:justify-start" to="/">
        <span class="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-lg font-black text-amber-300 shadow-lg shadow-slate-900/20 transition group-hover:-rotate-6 group-hover:scale-105 dark:bg-amber-300 dark:text-slate-950">M</span>
        <span class="text-left">
          <span class="block text-lg font-bold tracking-tight text-slate-950 dark:text-stone-50">Morrow</span>
          <span class="block text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Considered goods</span>
        </span>
      </RouterLink>

      <nav aria-label="Primary" class="flex items-center justify-center gap-2 sm:justify-end">
        <RouterLink
          class="rounded-full px-3 py-2 text-center text-sm font-semibold text-stone-600 transition hover:bg-stone-200/70 hover:text-slate-950 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-50 sm:px-4"
          to="/"
        >
          Products
        </RouterLink>
        <RouterLink
          class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-center text-sm text-white shadow-md shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700 dark:bg-amber-300 dark:text-slate-950 dark:hover:bg-amber-200"
          to="/cart"
          aria-label="Shopping cart summary"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-1.1 2.2A1 1 0 0 0 6.8 17H19M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM20 21a1 1 0 1 0 0-2 1 1 0 1 0 0 2Z" /></svg>
          <span class="font-semibold">Cart</span>
          <span class="grid h-5 min-w-5 place-items-center rounded-full bg-white/20 px-1 text-xs font-bold dark:bg-slate-950/15">{{ cartStore.totalItemCount }}</span>
        </RouterLink>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>
