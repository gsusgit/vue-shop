<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  product: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="w-full bg-white border border-gray-200 rounded-lg shadow flex flex-col h-full relative hover:cursor-pointer">
    <RouterLink :to="{name: 'product', params: {id: product.id}}">
      <img
          class="p-8 rounded-t-lg"
          :src="product.image"
          :alt="t('shop.productImageAlt')"
      />
    </RouterLink>
    <div
        class="px-5 pb-5 flex flex-col flex-grow">
      <a href="#" class="flex min-h-10 flex-grow items-center justify-center">
        <h5 class="text-center text-sm font-semibold tracking-tight text-gray-900">{{ product.name }}</h5>
      </a>
    </div>
  </div>
</template>
