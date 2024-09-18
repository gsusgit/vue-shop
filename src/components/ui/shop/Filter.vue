<script setup>
import { useProductsStore } from '@/stores/products.js'

const products = useProductsStore()

const isSelected = (categoryValue) => {
  return products.selectedCategory === categoryValue
}

const selectCategory = (category) => {
  if (category === '') {
    products.selectedCategory = 0
  } else {
    products.selectedCategory = category
  }
}
</script>

<template>
  <div class="flex items-center justify-center flex-wrap">
    <button
        type="button"
        :class="[
          'border focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3',
          [isSelected(0) ? 'bg-teal-600 border-teal-800 text-white': 'bg-white text-gray-900']
        ]"
        @click="selectCategory('')"
    >
      All categories
    </button>
    <button
        v-for="category in products.filterCategories"
        :key="category.value"
        type="button"
        :class="[
          'border focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3',
          [isSelected(category.value) ? 'bg-teal-600 border-teal-800 text-white': 'bg-white text-gray-900']
        ]"
        @click="selectCategory(category.value)"
    >
      {{ category.label }}
    </button>
  </div>
</template>

