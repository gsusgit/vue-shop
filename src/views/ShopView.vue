<script setup>
import Filter from '@/components/ui/Filter.vue'
import Cart from '@/components/ui/Cart.vue'
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="col-span-2">
      <Filter />
      <div class="mt-5">

      </div>
    </div>
    <Cart />
  </div>
</template>
