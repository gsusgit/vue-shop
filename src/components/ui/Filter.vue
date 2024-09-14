<script setup>
  import { useProductsStore } from '@/stores/products.js'

  const products = useProductsStore()
</script>

<template>
  <div class="flex items-center justify-center flex-wrap">
    <button type="button" class="text-teal-600 hover:text-white border border-teal-600 bg-white hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3">All categories</button>
    <button
        v-for="category in products.filterCategories"
        type="button"
        class="text-gray-900 border border-white hover:border-gray-200 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3"
    >
      {{category.label}}
    </button>
  </div>
</template>
