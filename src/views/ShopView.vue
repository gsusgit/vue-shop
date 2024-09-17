<script setup>
import Filter from '@/components/ui/Filter.vue'
import Product from '@/components/ui/Product.vue'
import { useProductsStore } from '@/stores/products.js'
import Notification from '@/components/layout/Notification.vue'
import { onMounted, ref } from 'vue'
import Spinner from '@/components/layout/Spinner.vue'

const notification = {
  title: 'Store is empty',
  message: 'No products have been added to the store yet',
  button1: {
    text: 'Go to the admin panel and start adding products',
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
  setTimeout(() => {
    loading.value = false
  }, 1500)
})

const toggleFavourite = (product) => {
  if (products.isFavourite(product)) {
    products.removeFromFavourites(product)
  } else {
    products.addToFavourites(product, product.id)
  }
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
        <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
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
