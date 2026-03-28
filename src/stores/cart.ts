import { computed, ref, watch } from 'vue'
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

const CART_STORAGE_KEY = 'cart-items'

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'number' &&
    typeof candidate.title === 'string' &&
    typeof candidate.price === 'number' &&
    typeof candidate.thumbnail === 'string' &&
    typeof candidate.quantity === 'number' &&
    Number.isInteger(candidate.quantity) &&
    candidate.quantity > 0
  )
}

function loadStoredCartItems(): CartItem[] {
  if (typeof window === 'undefined') {
    return []
  }

  const storedValue = window.localStorage.getItem(CART_STORAGE_KEY)

  if (!storedValue) {
    return []
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue)

    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue.filter(isCartItem)
  } catch {
    return []
  }
}

function saveCartItems(items: CartItem[]): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadStoredCartItems())

  watch(
    items,
    (cartItems) => {
      saveCartItems(cartItems)
    },
    { deep: true },
  )

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
