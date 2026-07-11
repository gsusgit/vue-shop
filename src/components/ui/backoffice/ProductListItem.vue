<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatCurrency } from '@/lib/helpers.js'
import { useProductsStore } from '@/stores/products.js'
import Dialog from '@/components/layout/shared/Dialog.vue'

const props = defineProps({
  product: { type: Object, required: true },
  isChecked: { type: Boolean, required: true },
  layout: { type: String, default: 'table' }
})

const emit = defineEmits(['toggleSelection'])
const products = useProductsStore()
const { t } = useI18n()
const modal = ref({ message: '', show: false })

const getCategoryLabelById = id => {
  const item = products.filterCategories.find(category => category.value === Number(id))
  return item ? item.label : id
}

const stockClass = stock => {
  if (stock === 0) return 'border border-red-100 bg-red-50 text-red-800'
  if (stock <= 3) return 'border border-amber-100 bg-amber-50 text-amber-800'
  return 'border border-teal-100 bg-teal-50 text-teal-800'
}

const removeProduct = () => {
  modal.value.show = true
  modal.value.message = t('products.confirmRemoval')
}

const confirmProductRemoval = () => {
  modal.value.show = false
  modal.value.message = ''
  products.removeProduct(props.product.id, props.product.image)
}
</script>

<template>
  <Dialog :modal="modal" @confirm-product-removal="confirmProductRemoval" />

  <tr v-if="layout === 'table'" class="border-t bg-white hover:bg-gray-50">
    <td class="w-4 p-4">
      <input :id="`checkbox-table-search-${product.id}`" type="checkbox" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-teal-600 focus:ring-2 focus:ring-teal-500" :checked="isChecked" @change="emit('toggleSelection')">
      <label :for="`checkbox-table-search-${product.id}`" class="sr-only">{{ t('products.selectProduct', { name: product.name }) }}</label>
    </td>
    <td class="px-4 py-4"><img :src="product.image" :alt="product.name" class="h-10 w-10 rounded-md border border-gray-200 bg-gray-50 object-cover shadow-sm"></td>
    <th scope="row" class="px-4 py-4 font-medium text-gray-900">{{ product.name }}</th>
    <td class="px-4 py-4">{{ getCategoryLabelById(product.category) }}</td>
    <td class="px-4 py-4">
      <span :class="stockClass(product.stock)" class="rounded-xl px-2 py-1 text-xs font-medium">
        {{ product.stock }}
      </span>
    </td>
    <td class="px-4 py-4">{{ formatCurrency(product.price) }}</td>
    <td class="px-4 py-4 whitespace-nowrap">
      <RouterLink :to="{ name: 'edit-product', params: { id: product.id } }" class="font-medium text-teal-600 hover:text-teal-700">{{ t('common.edit') }}</RouterLink>
      <button type="button" class="ml-3 font-medium text-red-600 hover:text-red-700" @click="removeProduct">{{ t('common.remove') }}</button>
    </td>
  </tr>

  <article v-else class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <div class="flex gap-3">
      <input :id="`checkbox-card-${product.id}`" type="checkbox" class="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 bg-gray-100 text-teal-600 focus:ring-2 focus:ring-teal-500" :checked="isChecked" @change="emit('toggleSelection')">
      <label :for="`checkbox-card-${product.id}`" class="sr-only">{{ t('products.selectProduct', { name: product.name }) }}</label>
      <img :src="product.image" :alt="product.name" class="h-16 w-16 shrink-0 rounded-md border border-gray-200 object-cover">
      <div class="min-w-0 flex-1">
        <h2 class="truncate font-semibold text-gray-900">{{ product.name }}</h2>
        <p class="mt-1 text-sm text-gray-500">{{ getCategoryLabelById(product.category) }}</p>
        <div class="mt-2 flex flex-wrap items-center justify-between gap-2">
          <span :class="stockClass(product.stock)" class="rounded-xl px-2 py-1 text-xs font-medium">
            {{ product.stock === 0 ? t('shop.outOfStock') : t('shop.inStock', { count: product.stock }) }}
          </span>
          <span class="font-semibold text-gray-900">{{ formatCurrency(product.price) }}</span>
        </div>
      </div>
    </div>
    <div class="mt-4 flex justify-end gap-4 border-t border-gray-100 pt-3 text-sm">
      <RouterLink :to="{ name: 'edit-product', params: { id: product.id } }" class="font-medium text-teal-600 hover:text-teal-700">{{ t('common.edit') }}</RouterLink>
      <button type="button" class="font-medium text-red-600 hover:text-red-700" @click="removeProduct">{{ t('common.remove') }}</button>
    </div>
  </article>
</template>
