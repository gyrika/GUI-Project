<script setup lang="ts">
defineProps<{
  categories: string[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleChange(event: Event): void {
  const target = event.target

  if (!(target instanceof HTMLSelectElement)) {
    return
  }

  emit('update:modelValue', target.value)
}
</script>

<template>
  <label class="block space-y-2">
    <span class="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-300">Browse by category</span>
    <span class="relative block">
      <select
        :value="modelValue"
        class="w-full appearance-none rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3.5 pr-10 text-sm font-medium capitalize text-slate-900 shadow-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-amber-300 dark:focus:bg-stone-900 dark:focus:ring-amber-300/10"
        @change="handleChange"
      >
        <option v-for="category in categories" :key="category" :value="category">
          {{ category.replace(/-/g, ' ') }}
        </option>
      </select>
      <svg class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </span>
  </label>
</template>
