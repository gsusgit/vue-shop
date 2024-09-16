<script setup>
import { formatCurrency } from '@/lib/helpers.js'
import { ref } from 'vue'
import Dialog from '@/components/layout/Dialog.vue'
import { useCart } from '@/stores/cart.js'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const dialog = ref({
  show: false,
  image: ''
})

const openDialog = () => {
  dialog.value.show = true
  dialog.value.image = props.product.image
}

const cart = useCart()
</script>

<template>
  <div
      class="w-full bg-white border border-gray-200 rounded-lg shadow flex flex-col h-full relative">
    <button
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-900"
        @click="openDialog"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-4.35-4.35M17.25 10.5a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0z"/>
      </svg>
    </button>
    <a href="#">
      <img
          class="p-8 rounded-t-lg"
          :src="product.image"
          alt="product image"/>
    </a>
    <div
        class="px-5 pb-5 flex flex-col flex-grow">
      <a href="#"
         class="flex-grow">
        <h5 class="text-sm font-semibold tracking-tight text-gray-900">{{product.name }}</h5>
      </a>
      <div
          class="flex items-center justify-between mt-4">
        <span class="text-sm font-bold text-gray-900">{{formatCurrency(product.price)}}</span>
        <a
            href="#"
            class="bg-neutral-200 text-neutral-800 hover:bg-teal-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-2 py-1 text-center"
            @click="cart.addItem(product)"
        >
          Add to cart
        </a>
      </div>
      <div class="mt-2">
        <p class="text-sm text-teal-700 font-medium">{{cart.checkProductAvailability(product)}} in stock</p>
      </div>
    </div>
    <Dialog
        :modal="dialog"/>
  </div>
</template>
