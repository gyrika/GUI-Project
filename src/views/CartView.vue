<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { useCartStore } from '@/stores/cart'
import type { CartItem } from '@/stores/cart'

const cartStore = useCartStore()

function handleIncrement(productId: CartItem['id']): void {
  cartStore.incrementQuantity(productId)
}

function handleDecrement(productId: CartItem['id']): void {
  cartStore.decrementQuantity(productId)
}

function handleRemove(productId: CartItem['id']): void {
  cartStore.removeFromCart(productId)
}
</script>

<template>
  <section class="mx-auto w-full max-w-6xl space-y-6">
    <header class="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800 dark:bg-slate-900">
      <div class="space-y-2">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Shopping cart</p>
        <h1 class="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">Your selected items</h1>
        <p class="text-base leading-7 text-slate-600 dark:text-slate-300">
          Review your cart, adjust quantities, and keep track of your order total.
        </p>
      </div>

      <div class="rounded-2xl bg-slate-50 px-5 py-4 text-left sm:min-w-52 dark:bg-slate-800">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Total cost</p>
        <p class="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">${{ cartStore.totalPrice.toFixed(2) }}</p>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ cartStore.totalItemCount }} item(s)</p>
      </div>
    </header>

    <div
      v-if="cartStore.items.length === 0"
      class="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 class="text-2xl font-semibold text-slate-950 dark:text-slate-50">Your cart is empty</h2>
      <p class="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
        Add a few products to your cart and they will appear here.
      </p>
      <RouterLink
        class="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-300"
        to="/"
      >
        Continue shopping
      </RouterLink>
    </div>

    <div v-else class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <section class="space-y-4">
        <article
          v-for="item in cartStore.items"
          :key="item.id"
          class="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-5 sm:p-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <div class="h-28 w-full overflow-hidden rounded-2xl bg-slate-100 sm:w-28 sm:flex-none dark:bg-slate-800">
            <img
              :src="item.thumbnail"
              :alt="item.title"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div class="min-w-0 flex-1 space-y-3">
            <div class="space-y-1">
              <h2 class="text-lg font-semibold text-slate-950 dark:text-slate-50">{{ item.title }}</h2>
              <p class="text-sm text-slate-600 dark:text-slate-300">${{ item.price.toFixed(2) }} each</p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div class="inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
                <button
                  class="h-10 w-10 rounded-full text-lg font-medium text-slate-700 transition hover:bg-white dark:text-slate-100 dark:hover:bg-slate-700"
                  type="button"
                  aria-label="Decrease quantity"
                  @click="handleDecrement(item.id)"
                >
                  -
                </button>
                <span class="min-w-12 px-3 text-center text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {{ item.quantity }}
                </span>
                <button
                  class="h-10 w-10 rounded-full text-lg font-medium text-slate-700 transition hover:bg-white dark:text-slate-100 dark:hover:bg-slate-700"
                  type="button"
                  aria-label="Increase quantity"
                  @click="handleIncrement(item.id)"
                >
                  +
                </button>
              </div>

              <div class="flex flex-wrap items-center gap-3 sm:justify-end">
                <p class="text-base font-semibold text-slate-950 dark:text-slate-50">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </p>
                <button
                  class="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/50"
                  type="button"
                  @click="handleRemove(item.id)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>

      <aside class="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24 dark:border-slate-800 dark:bg-slate-900">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Order summary</p>
        <div class="mt-6 space-y-4">
          <div class="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>Items</span>
            <span>{{ cartStore.totalItemCount }}</span>
          </div>
          <div class="flex items-center justify-between text-lg font-semibold text-slate-950 dark:text-slate-50">
            <span>Total</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
        </div>

        <button
          class="mt-6 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-300"
          type="button"
          @click="cartStore.clearCart"
        >
          Clear cart
        </button>
      </aside>
    </div>
  </section>
</template>
