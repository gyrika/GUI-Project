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
    <span class="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Category</span>
    <select
      :value="modelValue"
      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
      @change="handleChange"
    >
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </label>
</template>
