<script setup>
import { formatCurrency } from '@/lib/helpers.js'
import SaleItem from '@/components/ui/backoffice/SaleItem.vue'

defineProps({
  sale: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="p-4 bg-white flex border rounded-lg flex-col mb-3 space-y-2">
    <div class="mb-3">
      <p class="text-md font-bold">Invoice #{{sale.id}}</p>
    </div>
    <div class="px-2">
      <ul role="list" class="divide-y divide-gray-200 border-b border-gray-200">
        <SaleItem
            v-for="item in sale.items"
            :key="item.id"
            :item="item" />
      </ul>
    </div>
    <div class="pt-4">
      <p>Subtotal: {{formatCurrency(sale.subtotal)}}</p>
      <p v-if="sale.discount" class="text-teal-700">{{sale.subtotal/sale.discount}}% discount: {{formatCurrency(sale.discount)}}</p>
      <p>Taxes (10%): {{formatCurrency(sale.taxes)}}</p>
      <p class="font-bold">Total: {{formatCurrency(sale.total)}}</p>
    </div>
  </div>
</template>
