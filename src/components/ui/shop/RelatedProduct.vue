<script setup>
import { RouterLink } from 'vue-router'

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
          alt="product image"
      />
    </RouterLink>
    <div
        class="px-5 pb-5 flex flex-col flex-grow">
      <a href="#"
         class="flex-grow">
        <h5 class="text-sm text-center font-semibold tracking-tight text-gray-900">{{product.name}}</h5>
      </a>
    </div>
  </div>
</template>
