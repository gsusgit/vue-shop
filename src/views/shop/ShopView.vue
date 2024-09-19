<script setup>
import Filter from '@/components/ui/shop/Filter.vue'
import Product from '@/components/ui/shop/Product.vue'
import { useProductsStore } from '@/stores/products.js'
import { onMounted, ref } from 'vue'
import Spinner from '@/components/layout/shared/Spinner.vue'

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
</script>

<template>
  <div v-if="!loading">
    <div
        v-if="products.filteredProducts.length > 0"
        class="grid grid-cols-1 gap-4">
      <div class="col-span-2">
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
    <div v-else>
      <h1 class="mb-4 text-4xl text-center font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">Store is empty</h1>
      <p class="mb-4 text-xl text-center font-semibold tracking-tight leading-none">No products have been added yet</p>
    </div>
  </div>
  <div v-else>
    <Spinner/>
  </div>
</template>
