<script setup>
import Filter from '@/components/ui/shop/Filter.vue'
import Product from '@/components/ui/shop/Product.vue'
import { useProductsStore } from '@/stores/products.js'
import Notification from '@/components/layout/shared/Notification.vue'
import { onMounted, ref } from 'vue'
import Spinner from '@/components/layout/shared/Spinner.vue'

const notification = {
  title: 'Store is empty',
  message: 'No products have been added to the store yet',
  button1: {
    text: 'Go to the backoffice and start adding products',
    route: ''
  },
  button2: {
    text: 'Import demo content',
    route: 'import-demo'
  }
}

const products = useProductsStore()
const loading = ref(true)

onMounted(() => {
  products.selectedCategory = 0
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

const toggleFavourite = (product) => {
  if (products.isFavourite(product)) {
    products.removeFromFavourites(product)
  } else {
    products.addToFavourites(product, product.id)
  }
}

const arrangeProducts = (query) => {
  products.arrangeProducts(query)
}
</script>

<template>
  <div v-if="!loading">
    <div
        v-if="products.filteredProducts.length > 0"
        class="grid grid-cols-1 gap-4">
      <div class="col-span-2">
        <h1 class="mb-10 text-center text-5xl font-bold text-gray-900">
          <span class="text-teal-600">Fresh Picks</span> for You
        </h1>
        <Filter />
        <div class="flex justify-end items-center space-x-2">
          <!-- Ícono -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
          <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10"
              @change="arrangeProducts($event.target.value)"
          >
            <option selected>Ordenar por</option>
            <option value="price-asc">Precio de menor a mayor</option>
            <option value="price-desc">Precio de mayor a menor</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
          </select>
        </div>
        <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Product
              v-for="product in products.filteredProducts"
              :key="product.id"
              :product="product"
              :is-favourite="products.favourites.some(fav => fav.id === product.id)"
              @toggle-favourite="toggleFavourite(product)"
          />
        </div>
      </div>
    </div>
    <div
        v-else
        class="mt-5">
      <Notification
          :notification="notification"/>
    </div>
  </div>
  <div
      v-else>
    <Spinner/>
  </div>
</template>
