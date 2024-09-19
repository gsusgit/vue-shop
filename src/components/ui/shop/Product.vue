<script setup>
import { formatCurrency } from '@/lib/helpers.js'
import { onMounted, ref, watch } from 'vue'
import Dialog from '@/components/layout/shared/Dialog.vue'
import { useCart } from '@/stores/cart.js'
import { defineEmits } from 'vue'
import { useProductsStore } from '@/stores/products.js'

const emit = defineEmits()

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
const products = useProductsStore()

const isFavorite = ref(false)

onMounted(() => {
  isFavorite.value = products.isFavourite(props.product)
})

watch(() => products.favourites, () => {
  isFavorite.value = products.isFavourite(props.product)
}, { deep: true })

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  emit('toggle-favourite', props.product)
}
</script>

<template>
  <div
      class="w-full bg-white border border-gray-200 rounded-lg shadow flex flex-col h-full relative">
    <button
        class="absolute top-2 left-2"
        @click="toggleFavorite"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
          :class="{ 'text-black': isFavorite, 'text-gray-400': !isFavorite }"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            :fill="isFavorite ? 'black' : 'none'"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </button>
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
    <RouterLink :to="{name: 'product', params: {id: product.id}}">
      <img
          class="p-2 rounded-t-lg"
          :src="product.image"
          alt="product image"/>
    </RouterLink>
    <div
        class="px-3 pb-5 flex flex-col flex-grow">
      <a href="#"
         class="flex-grow">
        <h5 class="text-sm font-semibold tracking-tight text-gray-900">
          {{
            product.name
          }}</h5>
      </a>
      <div
          class="flex items-center justify-between mt-4">
        <span
            class="text-sm font-bold text-gray-900">{{ formatCurrency(product.price) }}</span>
        <button
            class="bg-teal-600 text-white hover:bg-teal-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-2 py-1 text-center disabled:bg-neutral-200 disabled:text-neutral-400"
            :disabled="product.stock === 0"
            @click="cart.addItem(product)"
        >
          Add
          to
          cart
        </button>
      </div>
      <div
          class="mt-2">
        <p>
          <span
              :class="[cart.checkProductAvailability(product) === 0 ? 'bg-red-50 text-red-800 border border-red-100' : 'bg-teal-50 border border-teal-100 text-teal-800']"
              class="px-2 py-1 rounded-xl shadow-2xl text-xs font-medium">
                  {{
              cart.checkProductAvailability(product) === 0 ? 'Out of stock' : cart.checkProductAvailability(product) + ' in stock'
            }}
                </span>
        </p>
      </div>
    </div>
    <Dialog :modal="dialog"/>
  </div>
</template>
