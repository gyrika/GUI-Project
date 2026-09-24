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

function resetFilters(): void {
  selectedCategory.value = 'All'
  searchQuery.value = ''
}

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
  <section class="mx-auto w-full max-w-7xl space-y-7 sm:space-y-9">
    <header class="relative isolate overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-10 text-center text-white shadow-xl shadow-slate-900/15 sm:px-10 sm:py-14">
      <div class="absolute -left-16 top-0 -z-10 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />
      <div class="absolute -right-12 bottom-0 -z-10 h-64 w-64 rounded-full bg-emerald-300/15 blur-3xl" />
      <div class="mx-auto max-w-3xl space-y-5">
        <p class="text-xs font-bold uppercase tracking-[0.32em] text-amber-300">The everyday edit</p>
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Good things, found well.</h1>
        <p class="mx-auto max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
          Explore a considered collection of useful, joyful, and beautifully made products.
        </p>
        <div class="flex flex-wrap justify-center gap-2 pt-2 text-xs font-semibold text-stone-200">
          <span class="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">Curated daily</span>
          <span class="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">Easy returns</span>
          <span class="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">Fresh finds</span>
        </div>
      </div>
    </header>

    <div class="grid gap-4 rounded-3xl border border-stone-200 bg-white/85 p-4 shadow-lg shadow-stone-900/[0.04] backdrop-blur sm:p-5 md:grid-cols-[minmax(0,1fr)_240px] md:items-end dark:border-stone-800 dark:bg-stone-900/85">
      <SearchBar v-model="searchQuery" />
      <CategoryFilter v-model="selectedCategory" :categories="categories" />
    </div>

    <div class="flex flex-wrap items-center justify-between gap-3 px-1">
      <p class="text-sm font-medium text-stone-600 dark:text-stone-300">
        <span class="font-bold text-slate-950 dark:text-stone-50">{{ filteredProducts.length }}</span>
        {{ filteredProducts.length === 1 ? 'piece' : 'pieces' }} in the current edit
      </p>
      <p class="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
        <span class="h-2 w-2 rounded-full bg-emerald-500" /> New arrivals, ready to discover
      </p>
    </div>

    <div
      v-if="loading"
      class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="Loading products"
    >
      <div
        v-for="item in 6"
        :key="item"
        class="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900"
      >
        <div class="aspect-[4/3] animate-pulse bg-stone-200 dark:bg-stone-800" />
        <div class="space-y-3 p-5">
          <div class="h-3 w-24 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
          <div class="h-5 w-3/4 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
          <div class="h-6 w-20 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    </div>

    <div
      v-else-if="error"
      class="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700 shadow-sm dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
      role="alert"
    >
      <h2 class="text-xl font-semibold">Unable to load products</h2>
      <p class="mx-auto mt-2 max-w-xl text-sm leading-6">{{ error }}</p>
      <button
        class="mt-6 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-amber-300 dark:text-slate-950 dark:hover:bg-amber-200"
        type="button"
        @click="loadProducts"
      >
        Try again
      </button>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="rounded-3xl border border-stone-200 bg-white px-6 py-12 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <h2 class="text-xl font-semibold text-slate-900 dark:text-stone-100">No products found</h2>
      <p class="mx-auto mt-2 max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-300">
        Try a different search term or category, or reset the filters to see everything again.
      </p>
      <button
        class="mt-6 rounded-full border border-stone-200 bg-stone-50 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:hover:border-stone-600 dark:hover:bg-stone-700"
        type="button"
        @click="resetFilters"
      >
        Reset filters
      </button>
    </div>

    <ProductGrid v-else :products="filteredProducts" />
  </section>
</template>
