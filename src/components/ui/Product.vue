<script setup>
import { formatCurrency } from '@/lib/helpers.js'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="w-full bg-white border border-gray-200 rounded-lg shadow flex flex-col h-full">
    <a href="#">
      <img class="p-8 rounded-t-lg" :src="product.image" alt="product image" />
    </a>
    <div class="px-5 pb-5 flex flex-col flex-grow">
      <a href="#" class="flex-grow">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900">{{ product.name }}</h5>
      </a>
      <div class="flex items-center justify-between mt-4">
        <span class="text-2xl font-bold text-gray-900">{{ formatCurrency(product.price) }}</span>
        <a href="#" class="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</a>
      </div>
    </div>
  </div>
</template>
