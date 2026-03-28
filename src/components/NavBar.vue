<script setup lang="ts">
import { RouterLink } from 'vue-router'

import ThemeToggle from '@/components/ThemeToggle.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <header class="border-b border-slate-200/80 bg-white/90 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/90">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Bun + Vue 3</p>
        <RouterLink class="text-xl font-semibold tracking-tight text-slate-950 transition hover:text-slate-700 dark:text-slate-50 dark:hover:text-slate-300" to="/">
          Product Explorer
        </RouterLink>
      </div>

      <nav aria-label="Primary" class="flex flex-wrap items-center gap-2">
        <RouterLink
          class="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          to="/"
        >
          Products
        </RouterLink>
        <RouterLink
          class="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-900 transition hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-100 dark:hover:border-emerald-700 dark:hover:bg-emerald-900/70"
          to="/cart"
          aria-label="Shopping cart summary"
        >
          <p class="font-semibold">Cart ({{ cartStore.totalItemCount }})</p>
          <p class="text-xs text-emerald-700 dark:text-emerald-300">${{ cartStore.totalPrice.toFixed(2) }}</p>
        </RouterLink>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>
