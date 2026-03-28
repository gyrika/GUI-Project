import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { Product } from '@/types/product'

export interface CartItem {
  id: Product['id']
  title: Product['title']
  price: Product['price']
  thumbnail: Product['thumbnail']
  quantity: number
}

type CartProduct = Pick<Product, 'id' | 'title' | 'price' | 'thumbnail'>

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalItemCount = computed(() =>
    items.value.reduce((count, item) => count + item.quantity, 0),
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  function addToCart(product: CartProduct): void {
    const existingItem = items.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
      return
    }

    items.value.push({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    })
  }

  function removeFromCart(productId: CartItem['id']): void {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  function incrementQuantity(productId: CartItem['id']): void {
    const cartItem = items.value.find((item) => item.id === productId)

    if (!cartItem) {
      return
    }

    cartItem.quantity += 1
  }

  function decrementQuantity(productId: CartItem['id']): void {
    const cartItem = items.value.find((item) => item.id === productId)

    if (!cartItem) {
      return
    }

    if (cartItem.quantity === 1) {
      removeFromCart(productId)
      return
    }

    cartItem.quantity -= 1
  }

  function clearCart(): void {
    items.value = []
  }

  return {
    items,
    totalItemCount,
    totalPrice,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  }
})
