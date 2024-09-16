<script setup>
import { formatCurrency } from '@/lib/helpers.js'

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="w-full flex flex-col h-full">
    <a href="#">
      <img class="p-8 rounded-t-lg" :src="product.image" alt="product image" />
    </a>
    <div class="px-5 pb-5 flex flex-col flex-grow">
      <a href="#" class="flex-grow">
        <h5 class="text-sm font-semibold tracking-tight text-gray-900">{{ product.name }}</h5>
      </a>
      <div class="flex items-center justify-between mt-4">
        <span class="text-sm font-bold text-gray-900">{{ formatCurrency(product.price) }}</span>
        <a href="#" class="bg-neutral-200 text-neutral-800 hover:bg-teal-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-xs px-2 py-1 text-center">Add to cart</a>
      </div>
    </div>
  </div>
</template>
