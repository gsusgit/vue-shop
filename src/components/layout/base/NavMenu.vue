<script setup>
import NavItem from './NavItem.vue'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useCart } from '@/stores/cart.js'
import { useProductsStore } from '@/stores/products.js'

const route = useRoute()

const isAdminRoute = computed(() => route.path.startsWith('/backoffice'))

const cart = useCart()
const products = useProductsStore()
</script>

<template>
  <div v-if="!isAdminRoute" class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <NavItem to="cart" type="icon">
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <span class="absolute top-0 right-0 bg-teal-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {{ cart.items.length }}
        </span>
      </div>
    </NavItem>
    <NavItem to="favourites" type="icon">
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <span class="absolute top-0 right-0 bg-teal-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {{ products.favourites.length }}
        </span>
      </div>
    </NavItem>
    <NavItem to="sales" type="button">Admin</NavItem>
  </div>
  <div v-else class="hidden w-full md:block md:w-auto" id="navbar-multi-level">
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 rtl:space-x-reverse md:flex-row md:mt-0">
      <NavItem to="products" type="link">Products</NavItem>
      <NavItem to="sales" type="link">Sales</NavItem>
      <NavItem to="home" type="button">Go to shop</NavItem>
    </ul>
  </div>
</template>
