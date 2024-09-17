<script setup>
import Product from '@/components/ui/Product.vue'
import { useProductsStore } from '@/stores/products.js'
import Notification from '@/components/layout/Notification.vue'
import { onMounted, ref } from 'vue'
import Spinner from '@/components/layout/Spinner.vue'

const notification = {
  title: 'Oops, nothing here...',
  message: 'Your favorites list is currently empty! Explore our products and add your preferred items here to keep them handy.',
  button1: {
    text: 'Go to the home page',
    route: 'home'
  },
  button2: {
    text: '',
    route: ''
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
  if (products.favourites.some(fav => fav.id === product.id)) {
    products.removeFromFavourites(product)
  } else {
    products.addToFavourites(product)
  }
}
</script>

<template>
  <div v-if="!loading">
    <h1 class="mb-4 mt-5 text-xl font-semibold leading-none tracking-tight text-gray-900">Your Wishlist</h1>
    <div v-if="products.favourites.length > 0">
      <p>Here you can see all the products you've added to your favorites list. Browse through and quickly find your favorite items!</p>
      <div
          class="mt-5 grid grid-cols-1 gap-4">
        <div class="col-span-2">
          <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <Product
                v-for="product in products.favourites"
                :key="product.id"
                :product="product"
                @toggle-favourite="toggleFavourite(product)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mt-5">
      <Notification :notification="notification" />
    </div>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>
