<script setup>

import { useProductsStore } from '@/stores/products.js'
import useProductsTable from '@/composables/useProductsTable.js'
import ProductListItem from '@/components/ui/backoffice/ProductListItem.vue'
import { ref } from 'vue'
import Dialog from '@/components/layout/shared/Dialog.vue'
import useToast from '@/composables/useToast.js'

const products = useProductsStore()
const { show } = useToast()
const modal = ref({
  message: '',
  show: false
})

const {
  checkAll,
  uncheckAll,
  allChecked,
  selectedProducts,
  toggleProductSelection,
  isProductSelected
} = useProductsTable()

const confirmProductsRemoval = () => {
  modal.value.show = false
  modal.message = ''
  selectedProducts.value.forEach(product => {
    products.removeProduct(product.id, product.image)
  })
  show('Products were removed', 'success')
  uncheckAll()
}

const removeSelectedProducts = () => {
  modal.value.show = true
  modal.value.message = 'Are you sure you want to delete all the products?'
}

</script>

<template>
  <Dialog
      :modal="modal"
      @confirm-product-removal="confirmProductsRemoval"
  />
  <div v-if="products.productsCollection.length > 0" class="relative mt-5 p-5 bg-white overflow-x-auto shadow-md sm:rounded-lg">
    <div
        v-if="selectedProducts.length > 0"
        class="my-4 ms-auto"
    >
      <button
          class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          @click="removeSelectedProducts"
      >
        Remove selected products
      </button>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase">
      <tr>
        <th scope="col" class="p-4">
          <div class="flex items-center">
            <input
                type="checkbox" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                @change="checkAll"
                :checked="allChecked"
            >
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
      <ProductListItem
          v-for="product in products.productsCollection"
          :key="product.id"
          :product="product"
          :isChecked="isProductSelected(product)"
          @toggleSelection="toggleProductSelection(product)"
      />
      </tbody>
    </table>
  </div>
</template>
