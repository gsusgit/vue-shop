<script setup>
import PageTitle from '@/components/layout/PageTitle.vue'
</script>

<template>
  <PageTitle title="Products"  parentTitle="Admin"/>
  <div class="mt-10">
    <RouterLink :to="{name: 'new-product'}">
      <button type="button" class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300">
        Add new product
      </button>
    </RouterLink>
  </div>
</template>
