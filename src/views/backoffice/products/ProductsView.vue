<script setup>
import PageTitle from '@/components/layout/base/PageTitle.vue'
import ProductList from '@/components/ui/backoffice/ProductList.vue'
import { useProductsStore } from '@/stores/products.js'
import Notification from '@/components/layout/shared/Notification.vue'
import { onMounted, ref } from 'vue'
import Spinner from '@/components/layout/shared/Spinner.vue'

const products = useProductsStore()

const notification = {
  title: 'Store is empty',
  message: 'No products have been added to the store yet. Start by clicking the button below to add your first product and manage it easily from here.',
  button1: {
    text: 'Start adding a new product',
    route: ''
  },
  button2: {
    text: 'Import demo content',
    route: 'import-demo'
  }
}

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1500)
})
</script>

<template>
  <div v-if="!loading">
    <PageTitle title="Products"  parentTitle="Admin"/>
    <div class="mt-5">
      <RouterLink v-if="products.productsCollection.length > 0" :to="{name: 'new-product'}">
        <button type="button" class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300">
          Add new product
        </button>
      </RouterLink>
      <Notification
          v-else
          :notification="notification"/>
    </div>
    <ProductList />
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>
