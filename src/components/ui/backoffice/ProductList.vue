<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProductsStore } from '@/stores/products.js'
import useProductsTable from '@/composables/useProductsTable.js'
import ProductListItem from '@/components/ui/backoffice/ProductListItem.vue'
import Dialog from '@/components/layout/shared/Dialog.vue'
import useToast from '@/composables/useToast.js'

const products = useProductsStore()
const { show } = useToast()
const { t } = useI18n()
const modal = ref({ message: '', show: false })
const { checkAll, uncheckAll, allChecked, selectedProducts, toggleProductSelection, isProductSelected } = useProductsTable()

const confirmProductsRemoval = () => {
  localStorage.removeItem('cartItems')
  localStorage.removeItem('favourites')
  modal.value.show = false
  modal.value.message = ''
  selectedProducts.value.forEach(product => products.removeProduct(product.id, product.image))
  show(t('products.removed'), 'success')
  uncheckAll()
}

const removeSelectedProducts = () => {
  modal.value.show = true
  modal.value.message = t('products.confirmBulkRemoval')
}
</script>

<template>
  <Dialog :modal="modal" @confirm-product-removal="confirmProductsRemoval" />
  <section v-if="products.productsCollection.length > 0" class="mt-5 rounded-lg bg-white p-4 shadow-md sm:p-5">
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <label class="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
        <input id="checkbox-all-search" type="checkbox" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-teal-600 focus:ring-2 focus:ring-teal-500" :checked="allChecked" @change="checkAll">
        {{ t('products.selectAll') }}
      </label>
      <button v-if="selectedProducts.length > 0" type="button" class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300" @click="removeSelectedProducts">
        {{ t('products.removeSelected') }}
      </button>
    </div>

    <div class="space-y-3 sm:hidden">
      <ProductListItem
          v-for="product in products.productsCollection"
          :key="product.id"
          layout="card"
          :product="product"
          :is-checked="isProductSelected(product)"
          @toggle-selection="toggleProductSelection(product)"
      />
    </div>

    <div class="hidden overflow-x-auto sm:block">
      <table class="w-full min-w-[700px] text-left text-sm text-gray-500">
        <thead class="text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" class="p-4"><span class="sr-only">{{ t('products.selectAll') }}</span></th>
            <th scope="col" class="px-4 py-3">{{ t('common.image') }}</th>
            <th scope="col" class="px-4 py-3">{{ t('common.name') }}</th>
            <th scope="col" class="px-4 py-3">{{ t('common.category') }}</th>
            <th scope="col" class="px-4 py-3">{{ t('common.stock') }}</th>
            <th scope="col" class="px-4 py-3">{{ t('common.price') }}</th>
            <th scope="col" class="px-4 py-3">{{ t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <ProductListItem
              v-for="product in products.productsCollection"
              :key="product.id"
              :product="product"
              :is-checked="isProductSelected(product)"
              @toggle-selection="toggleProductSelection(product)"
          />
        </tbody>
      </table>
    </div>
  </section>
</template>
