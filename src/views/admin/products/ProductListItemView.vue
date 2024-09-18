<script setup>
import { formatCurrency } from '@/lib/helpers.js'
import { useProductsStore } from '@/stores/products.js'
import { ref } from 'vue'
import Dialog from '@/components/layout/Dialog.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const products = useProductsStore()

const modal = ref({
  message: '',
  show: false
})

const removeProduct = (id) => {
  modal.value.show = true
  modal.value.message = 'Are you sure you want to delete this product?'
}

const confimProductRemoval = () => {
  modal.value.show = false
  modal.message = 'Confirmar borrado de cliente'
  products.removeProduct(props.product.id, props.product.image)
}

const getCategoryLabelById = (id) => {
  const numericId = Number(id);
  const item = products.filterCategories.find(item => item.value === numericId);
  return item ? item.label : "Label not found";
}
</script>

<template>
  <Dialog
      :modal="modal"
      @confirm-product-removal="confimProductRemoval"
  />
  <tr class="bg-white border-t hover:bg-gray-50">
    <td class="w-4 p-4">
      <div
          class="flex items-center">
        <input
            id="checkbox-table-search-1"
            type="checkbox"
            class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2">
        <label
            for="checkbox-table-search-1"
            class="sr-only">checkbox</label>
      </div>
    </td>
    <th scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      <img
          :src="product.image"
          :alt="product.name"
          class="w-10 rounded-md shadow-sm border border-gray-200 bg-gray-50"
      />
    </th>
    <th scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ product.name }}
    </th>
    <td class="px-6 py-4">
      {{ getCategoryLabelById(product.category) }}
    </td>
    <td class="px-6 py-4">
      <span
          :class="[product.stock === 0 ? 'bg-red-50 text-red-800 border border-red-100' : 'bg-teal-50 border border-teal-100 text-teal-800']"
          class="px-2 py-1 rounded-xl shadow-2xl text-xs font-medium"
      >
        {{product.stock === 0 ? 'Out of stock' : product.stock + ' in stock' }}
      </span>
    </td>
    <td class="px-6 py-4">
      {{ formatCurrency(product.price) }}
    </td>
    <td class="px-6 py-4">
      <RouterLink
          :to="{name: 'edit-product', params: {id: product.id}}"
      >
        <a href="#"
           class="font-medium text-teal-600 hover:text-teal-700">Edit</a>
      </RouterLink>
      <a
          href="#"
          class="ml-3 font-medium text-red-600 hover:text-red-700"
          @click="removeProduct"
      >
        Remove
      </a>
    </td>
  </tr>
</template>
