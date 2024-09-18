<script setup>
import { formatCurrency } from '@/lib/helpers.js'
import { useCart } from '@/stores/cart.js'

defineProps({
  item: {
    type: Object,
    required: true
  }
})

const cart = useCart()

</script>

<template>
  <li class="flex items-center justify-between py-6">
    <div class="flex items-center space-x-6">
      <RouterLink :to="{name: 'product', params: {id: item.id}}">
        <img
            :src="item.image"
            class="h-20 w-20 flex-none rounded-md border border-gray-200 hover:border-gray-300"
            :alt="item.name" />
      </RouterLink>
      <div class="flex-auto space-y-2">
        <RouterLink :to="{name: 'product', params: {id: item.id}}">
          <h3 class="text-gray-900 hover:text-teal-700" style="min-width: 350px;">{{ item.name }}</h3>
        </RouterLink>
        <p class="font-semibold">{{ formatCurrency(item.price) }}</p>
      </div>
    </div>
    <select
        class="w-32 text-center p-2 rounded-lg border border-gray-300"
        @change="cart.updateQuantity(item.id, +$event.target.value)"
        :value="item.quantity"
    >
      <option
          v-for="i in cart.checkProductAvailability(item)"
          :value="i"
      >
        {{i}}
      </option>
    </select>
    <button
        type="button"
        @click="cart.removeItem(item.id)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-neutral-500 hover:text-red-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    </button>
  </li>
</template>

