<script
    setup
    xmlns="http://www.w3.org/1999/html">
import { formatCurrency } from '@/lib/helpers.js'

defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
<!--  hacer que el ultimo li no tenga border bottom-->
  <li class="flex items-center justify-between py-4">
    <div class="flex items-center space-x-6">
      <img
          :src="item.image"
          class="h-12 w-12 flex-none border-lg border-gray-100 border-1 rounded-lg"
          :alt="item.name" />
      <div class="flex-auto">
        <p class="font-semibold text-sm" style="min-width: 350px;">{{ item.name }}</p>
      </div>
      <div class="flex-auto">
        <p class="text-sm">Qty: {{ item.quantity }}</p>
      </div>
      <div class="flex-auto">
        <p class="text-sm">Price: {{ formatCurrency(item.price) }}</p>
      </div>
    </div>
    <div class="flex-none">
      <p class="text-sm">Total: <span class="font-semibold">{{ formatCurrency(item.price * item.quantity) }}</span></p>
    </div>
  </li>
</template>
