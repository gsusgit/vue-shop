<script setup>

import { useI18n } from 'vue-i18n'
import { useProductsStore } from '@/stores/products.js'

const products = useProductsStore()
const { t } = useI18n()

const isSelected = (categoryValue) => {
  return products.selectedCategory === categoryValue
}

const selectCategory = category => {
  products.selectedCategory = Number(category) || 0
}
</script>

<template>

  <label class="block sm:hidden">
    <span class="sr-only">{{ t('common.category') }}</span>
    <select
        :value="products.selectedCategory"
        class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
        @change="selectCategory($event.target.value)"
    >
      <option :value="0">{{ t('shop.allCategories') }}</option>
      <option v-for="category in products.filterCategories" :key="category.value" :value="category.value">
        {{ category.label }}
      </option>
    </select>
  </label>

  <div class="hidden flex-wrap items-center justify-center sm:flex">
    <button
        type="button"
        :class="[
          'border focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3',
          [isSelected(0) ? 'bg-teal-600 border-teal-800 text-white': 'bg-white text-gray-900']
        ]"
        @click="selectCategory('')"
    >
      {{ t('shop.allCategories') }}
    </button>
    <button
        v-for="category in products.filterCategories"
        :key="category.value"
        type="button"
        :class="[
          'border focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3',
          [isSelected(category.value) ? 'bg-teal-600 border-teal-800 text-white': 'bg-white text-gray-900']
        ]"
        @click="selectCategory(category.value)"
    >
      {{ category.label }}
    </button>
  </div>
</template>

