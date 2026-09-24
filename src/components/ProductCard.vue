<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { Product } from '@/types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'product-detail', params: { id: product.id } }"
    class="group block overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-stone-300 hover:shadow-xl hover:shadow-stone-900/10 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700"
  >
    <div class="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
        loading="lazy"
      />
      <span v-if="product.discountPercentage > 0" class="absolute left-3 top-3 rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm dark:bg-amber-300 dark:text-slate-950">
        {{ product.discountPercentage.toFixed(0) }}% off
      </span>
      <span class="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur dark:bg-stone-950/85 dark:text-stone-100">
        <span class="text-amber-500">★</span>{{ product.rating.toFixed(1) }}
      </span>
    </div>

    <div class="space-y-3 p-5">
      <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
        {{ product.category.replace(/-/g, ' ') }}
      </p>
      <h2 class="line-clamp-2 min-h-12 text-lg font-bold leading-6 text-slate-900 dark:text-stone-100">
        {{ product.title }}
      </h2>
      <div class="flex items-end justify-between gap-3 pt-1">
        <p class="text-xl font-bold tracking-tight text-slate-950 dark:text-stone-50">${{ product.price.toFixed(2) }}</p>
        <span class="text-sm font-bold text-stone-500 transition group-hover:translate-x-1 group-hover:text-slate-950 dark:group-hover:text-amber-300">View <span aria-hidden="true">→</span></span>
      </div>
    </div>
  </RouterLink>
</template>
