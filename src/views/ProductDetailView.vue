<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  id: number
}>()

const productIdLabel = computed(() => props.id.toString())
</script>

<template>
  <section class="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
    <div class="space-y-4">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Product detail</p>
      <h1 class="text-3xl font-semibold tracking-tight text-slate-950">Placeholder view</h1>
      <p class="text-base leading-7 text-slate-600">
        Detail routing is configured. Product
        <span class="font-semibold text-slate-900">#{{ productIdLabel }}</span>
        can be loaded here next.
      </p>
      <RouterLink
        class="inline-flex rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        to="/"
      >
        Back to products
      </RouterLink>
    </div>
  </section>
</template>
