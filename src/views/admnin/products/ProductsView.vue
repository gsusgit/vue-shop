<script setup>
import PageTitle from '@/components/layout/PageTitle.vue'
import ProductListView from '@/views/admnin/products/ProductListView.vue'
import { useProductsStore } from '@/stores/products.js'
import Notification from '@/components/layout/Notification.vue'

const products = useProductsStore()

const notification = {
  title: 'Store is empty',
  message: 'No products have been added to the store yet. Start by clicking the button below to add your first product and manage it easily from here.',
  button: 'Start adding a new product'
}
</script>

<template>
  <PageTitle title="Products"  parentTitle="Admin"/>
  <div class="mt-5">
    <RouterLink v-if="products.length > 0" :to="{name: 'new-product'}">
      <button type="button" class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300">
        Add new product
      </button>
    </RouterLink>
    <Notification
        v-else
        :notification="notification"/>
  </div>
  <ProductListView />
</template>
