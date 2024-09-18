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
  <li class="flex items-center justify-between pb-4">
    <div class="flex items-center space-x-6">
      <img
          :src="item.image"
          class="h-12 w-12 flex-none"
          :alt="item.name" />
      <div class="flex-auto">
        <p class="font-semibold text-sm" style="min-width: 350px;">{{ item.name }}</p>
      </div>
      <div class="flex-auto">
        <p class="text-sm">Qty: <span class="font-semibold">{{ item.quantity }}</span></p>
      </div>
      <div class="flex-auto">
        <p class="text-sm">Price: <span class="font-semibold">{{ formatCurrency(item.price) }}</span></p>
      </div>
    </div>
  </li>
</template>
