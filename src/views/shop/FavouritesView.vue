<script setup>
import Product from '@/components/ui/shop/Product.vue'
import { useProductsStore } from '@/stores/products.js'
import Notification from '@/components/layout/shared/Notification.vue'
import { onMounted, ref } from 'vue'
import Spinner from '@/components/layout/shared/Spinner.vue'
import { useI18n } from 'vue-i18n'
import useToast from '@/composables/useToast.js'

const { t } = useI18n()
const { show } = useToast()

const notification = {
  title: t('shop.wishlistEmptyTitle'),
  message: t('shop.wishlistEmptyMessage'),
  button1: { text: t('shop.goHome'), route: 'home' },
  button2: { text: '', route: '' }
}

const products = useProductsStore()

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

const toggleFavourite = (product) => {
  if (products.favourites.some(fav => fav.id === product.id)) {
    products.removeFromFavourites(product)
    show(t('shop.removedFromWishlist'), 'success')
  } else {
    products.addToFavourites(product)
    show(t('shop.addedToWishlist'), 'success')
  }
}
</script>

<template>
  <div v-if="!loading">
    <h1 class="mb-4 mt-5 text-xl font-semibold leading-none tracking-tight text-gray-900">{{ t('shop.wishlist') }}</h1>
    <div v-if="products.favourites.length > 0">
      <p>{{ t('shop.wishlistHelp') }}</p>
      <div
          class="mt-5 grid grid-cols-1 gap-4">
        <div class="col-span-2">
          <div class="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
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
