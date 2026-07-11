<script setup>
import Filter from '@/components/ui/shop/Filter.vue'
import Product from '@/components/ui/shop/Product.vue'
import { useProductsStore } from '@/stores/products.js'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Spinner from '@/components/layout/shared/Spinner.vue'
import CartSummaryModal from '@/components/ui/shop/CartSummaryModal.vue'

const products = useProductsStore()
const { t } = useI18n()
const loading = ref(true)
const cartSummaryOpen = ref(false)

onMounted(() => {
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

const showCartSummary = () => {
  cartSummaryOpen.value = true
}
</script>

<template>
  <CartSummaryModal
      :show="cartSummaryOpen"
      @close="cartSummaryOpen = false"
  />
  <div v-if="!loading">
    <div v-if="products.productsCollection.length > 0" class="grid grid-cols-1 gap-4">
      <div class="col-span-2">
        <Filter />
        <div
            v-if="products.filteredProducts.length > 0"
            id="product-results"
            class="mt-5 mb-5 scroll-mt-20 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
          <Product
              v-for="product in products.filteredProducts"
              :key="product.id"
              :product="product"
              :is-favourite="products.favourites.some(fav => fav.id === product.id)"
              @toggle-favourite="toggleFavourite(product)"
              @added-to-cart="showCartSummary"
          />
        </div>
        <div v-else id="product-results" class="scroll-mt-20 py-10 text-center">
          <h1 class="mb-2 text-2xl font-extrabold tracking-tight text-gray-900">{{ t('shop.noProducts') }}</h1>
                    <p class="text-gray-600">{{ t('shop.tryDifferentFilter') }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="mb-4 text-4xl text-center font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">{{ t('shop.storeEmpty') }}</h1>
            <p class="mb-4 text-xl text-center font-semibold tracking-tight leading-none">{{ t('shop.noProductsAdded') }}</p>
    </div>
  </div>
  <div v-else>
    <Spinner/>
  </div>
</template>
