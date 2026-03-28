<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import CategoryFilter from '@/components/CategoryFilter.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import SearchBar from '@/components/SearchBar.vue'
import { fetchCategories } from '@/services/api'
import { useProducts } from '@/composables/useProducts'

const { products, loading, error, loadProducts } = useProducts()
const categories = ref<string[]>(['All'])
const selectedCategory = ref('All')
const searchQuery = ref('')

const filteredProducts = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()

  return products.value.filter((product) => {
    const matchesCategory =
      selectedCategory.value === 'All' || product.category === selectedCategory.value
    const matchesSearch = product.title.toLowerCase().includes(normalizedQuery)

    return matchesCategory && matchesSearch
  })
})

async function loadProductCategories(): Promise<void> {
  try {
    const response = await fetchCategories()
    categories.value = ['All', ...response]
  } catch {
    categories.value = ['All']
  }
}

onMounted(() => {
  void loadProducts()
  void loadProductCategories()
})
</script>

<template>
  <section class="mx-auto w-full max-w-6xl space-y-10">
    <header class="space-y-4 text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">DummyJSON products</p>
      <h1 class="text-4xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl">
        Clean product listing starter
      </h1>
      <p class="mx-auto max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
        A simple responsive catalog layout powered by Vue 3, TypeScript, Tailwind CSS, and Bun.
      </p>
    </header>

    <div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_240px] md:items-end">
      <SearchBar v-model="searchQuery" />
      <CategoryFilter v-model="selectedCategory" :categories="categories" />
    </div>

    <div
      v-if="loading"
      class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="Loading products"
    >
      <div
        v-for="item in 6"
        :key="item"
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="aspect-[4/3] animate-pulse bg-slate-200 dark:bg-slate-800" />
        <div class="space-y-3 p-5">
          <div class="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div class="h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div class="h-6 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>

    <div
      v-else-if="error"
      class="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-red-700 shadow-sm dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
      role="alert"
    >
      <h2 class="text-lg font-semibold">Unable to load products</h2>
      <p class="mt-2 text-sm">{{ error }}</p>
      <button
        class="mt-5 rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-300"
        type="button"
        @click="loadProducts"
      >
        Try again
      </button>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">No products found</h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Try a different search term or category.</p>
    </div>

    <ProductGrid v-else :products="filteredProducts" />
  </section>
</template>
