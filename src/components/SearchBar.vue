<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event): void {
  const target = event.target

  if (!(target instanceof HTMLInputElement)) {
    return
  }

  emit('update:modelValue', target.value)
}
</script>

<template>
  <label class="block space-y-2">
    <span class="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-300">Search the edit</span>
    <span class="relative block">
      <svg class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m20 20-4.35-4.35" /></svg>
      <input
        :value="modelValue"
        class="w-full rounded-2xl border border-stone-200 bg-stone-50 px-11 py-3.5 text-sm font-medium text-slate-900 shadow-sm outline-none transition placeholder:font-normal placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-300 dark:focus:bg-stone-900 dark:focus:ring-amber-300/10"
        placeholder="Search products, brands, and more"
        type="search"
        @input="handleInput"
      />
    </span>
  </label>
</template>
