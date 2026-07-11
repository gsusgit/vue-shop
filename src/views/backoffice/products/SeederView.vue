<script setup>
import { products } from '@/data/products.js'
import { seedDemoProducts } from '@/data/mockDb.js'
import { getDemoImageUrl } from '@/data/demoImages.js'
import PageTitle from '@/components/layout/base/PageTitle.vue'
import useToast from '@/composables/useToast.js'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

function seedDB() {
  seedDemoProducts(products, (i) => getDemoImageUrl(i) || `/demo/product${i + 1}.jpg`)
  localStorage.removeItem('cartItems')
  localStorage.removeItem('favourites')
  localStorage.setItem('demoImported', '1')
  router.push({ name: 'products' })
}
</script>

<template>
  <PageTitle
      :title="t('products.importDemo')"
            :parent-title="t('navigation.products')"
            parent-route="products" />
  <div
      class="mt-10 p-5 border border-gray-200 rounded-lg bg-white">
    <div
        id="alert-additional-content-3"
        class="p-4 mb-4 text-teal-800 border border-gray-300 rounded-lg bg-white"
        role="alert">
      <div
          class="flex items-center">
        <svg
            class="flex-shrink-0 w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20">
          <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <h3 class="text-lg font-medium">{{ t('products.importDemoQuestion') }}</h3>
      </div>
      <div class="mt-2 mb-4 text-sm">{{ t('products.importDemoHelp') }}
            </div>
    </div>
    <div
        class="mt-5">
      <FormKit
          type="form"
          :submit-label="t('products.importProducts')"
          @submit="seedDB"
      />
    </div>
  </div>
</template>
