<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { fetchProductById } from '@/services/api'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types/product'

const route = useRoute()
const cartStore = useCartStore()
const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const productId = computed(() => {
  const idParam = route.params.id
  const normalizedId = Array.isArray(idParam) ? idParam[0] : idParam
  const parsedId = Number(normalizedId)

  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null
})

const productImage = computed(() => product.value?.images[0] ?? product.value?.thumbnail ?? '')
const isInCart = computed(() => {
  if (!product.value) {
    return false
  }

  return cartStore.items.some((item) => item.id === product.value.id)
})

function handleAddToCart(): void {
  if (!product.value) {
    return
  }

  cartStore.addToCart(product.value)
}

async function loadProduct(): Promise<void> {
  if (productId.value === null) {
    product.value = null
    error.value = 'Invalid product id.'
    loading.value = false
    return
  }

  loading.value = true
  error.value = null

  try {
    product.value = await fetchProductById(productId.value)
  } catch (caughtError: unknown) {
    error.value = caughtError instanceof Error ? caughtError.message : 'Failed to load product.'
    product.value = null
  } finally {
    loading.value = false
  }
}

watch(productId, () => {
  void loadProduct()
}, { immediate: true })
</script>

<template>
  <section class="mx-auto w-full max-w-5xl space-y-6">
    <RouterLink
      class="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
      to="/"
    >
      Back to products
    </RouterLink>

    <div
      v-if="loading"
      class="grid gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:p-8 dark:border-slate-800 dark:bg-slate-900"
      aria-label="Loading product"
    >
      <div class="aspect-[4/3] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div class="space-y-4">
        <div class="h-3 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div class="h-10 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div class="h-24 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div class="h-8 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div class="grid gap-3 sm:grid-cols-3">
          <div class="h-20 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div class="h-20 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div class="h-20 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>

    <div
      v-else-if="error"
      class="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700 shadow-sm dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
      role="alert"
    >
      <h1 class="text-xl font-semibold">Unable to load product</h1>
      <p class="mx-auto mt-2 max-w-xl text-sm leading-6">{{ error }}</p>
      <button
        class="mt-6 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-300"
        type="button"
        @click="loadProduct"
      >
        Try again
      </button>
    </div>

    <article
      v-else-if="product"
      class="grid gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:p-8 dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        <img
          :src="productImage"
          :alt="product.title"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="space-y-5 sm:space-y-6">
        <div class="space-y-4">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {{ product.category }}
          </p>
          <h1 class="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
            {{ product.title }}
          </h1>
          <p class="text-base leading-7 text-slate-600 dark:text-slate-300">
            {{ product.description }}
          </p>
        </div>

        <p class="text-3xl font-semibold text-slate-950 dark:text-slate-50">${{ product.price.toFixed(2) }}</p>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            class="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-300"
            type="button"
            @click="handleAddToCart"
          >
            Add to Cart
          </button>
          <p v-if="isInCart" class="text-sm text-slate-600 dark:text-slate-300">
            This item is already in your cart. Add again to increase quantity.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-3">
          <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Rating</p>
            <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{{ product.rating.toFixed(1) }}</p>
          </div>
          <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Stock</p>
            <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{{ product.stock }}</p>
          </div>
          <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Brand</p>
            <p class="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{{ product.brand }}</p>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
