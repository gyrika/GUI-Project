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
  <label class="block">
    <span class="mb-2 block text-sm font-medium text-slate-600">Search products</span>
    <input
      :value="modelValue"
      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      placeholder="Search by product title"
      type="search"
      @input="handleInput"
    />
  </label>
</template>
