<script setup>
import NavItem from './NavItem.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isAdminRoute = computed(() => route.path.startsWith('/admin'))

</script>

<template>
  <div v-if="!isAdminRoute" class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <NavItem to="products" type="button">Admin</NavItem>
  </div>
  <div v-else class="hidden w-full md:block md:w-auto" id="navbar-multi-level">
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 rtl:space-x-reverse md:flex-row md:mt-0">
      <NavItem to="products" type="link">Products</NavItem>
      <NavItem to="orders" type="link">Orders</NavItem>
      <NavItem to="home" type="button">Go to shop</NavItem>
    </ul>
  </div>
</template>
