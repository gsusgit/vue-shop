<script setup>
import { useProductsStore } from '@/stores/products.js'
import ProductListItemView from '@/views/admnin/products/ProductListItemView.vue'

const products = useProductsStore()
</script>

<template>
  <div v-if="products.productsCollection.length > 0" class="relative mt-5 p-5 bg-white overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase">
      <tr>
        <th scope="col" class="p-4">
          <div class="flex items-center">
            <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2">
            <label for="checkbox-all-search" class="sr-only">checkbox</label>
          </div>
        </th>
        <th scope="col" class="px-6 py-3">
          Image
        </th>
        <th scope="col" class="px-6 py-3">
          Name
        </th>
        <th scope="col" class="px-6 py-3">
          Category
        </th>
        <th scope="col" class="px-6 py-3">
          Stock
        </th>
        <th scope="col" class="px-6 py-3">
          Price
        </th>
        <th scope="col" class="px-6 py-3">
          Actions
        </th>
      </tr>
      </thead>
      <tbody>
      <ProductListItemView
        v-for="product in products.productsCollection"
        :product="product"
      />
      </tbody>
    </table>
  </div>
</template>
