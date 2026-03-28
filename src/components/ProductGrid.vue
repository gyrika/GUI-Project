<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import type { Product } from '@/types/product'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <section class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </section>
</template>
