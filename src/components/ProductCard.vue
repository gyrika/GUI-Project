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
    class="block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/20"
  >
    <div class="aspect-[4/3] bg-slate-100 dark:bg-slate-800">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </div>

    <div class="space-y-3 p-5">
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
        {{ product.category }}
      </p>
      <h2 class="line-clamp-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
        {{ product.title }}
      </h2>
      <p class="text-xl font-semibold text-slate-950 dark:text-slate-50">${{ product.price.toFixed(2) }}</p>
    </div>
  </RouterLink>
</template>
