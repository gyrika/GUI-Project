import { ref } from 'vue'

import { fetchProducts } from '@/services/api'
import type { Product } from '@/types/product'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadProducts(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const response = await fetchProducts()
      products.value = response.products
    } catch (caughtError: unknown) {
      error.value = caughtError instanceof Error ? caughtError.message : 'Failed to load products'
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    loadProducts,
  }
}
