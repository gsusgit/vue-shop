<script setup>
import Filter from '@/components/ui/Filter.vue'
import Cart from '@/components/ui/Cart.vue'
import Product from '@/components/ui/Product.vue'
import { useProductsStore } from '@/stores/products.js'
import { ref } from 'vue'
import Notification from '@/components/layout/Notification.vue'

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

const cartItems = ref(0) // tempral, hasta que coja el carrito del composable

const products = useProductsStore()

</script>

<template>
  <div
      v-if="products.productsCollection.length > 0"
      :class="[cartItems.length > 0 ? 'grid-cols-3 gap-4' : 'grid-cols-1 gap-4']"
      class="grid">
    <div class="col-span-2">
      <h1 class="mb-10 text-center text-5xl font-bold text-gray-900">
        <span class="text-teal-600">Fresh Picks</span> for You
      </h1>
      <Filter />
      <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Product
            v-for="product in products.productsCollection"
            :product="product"
        />
      </div>
    </div>
    <Cart
      v-if="cartItems.length > 0"
    />
  </div>
  <div v-else class="mt-5">
    <Notification
        :notification="notification"/>
  </div>
</template>
