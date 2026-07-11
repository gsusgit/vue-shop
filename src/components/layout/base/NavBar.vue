<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  Bars3Icon,
  ChevronDownIcon,
  GlobeAltIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import Logo from '@/components/layout/base/Logo.vue'
import { setLocale } from '@/i18n'
import { useCart } from '@/stores/cart.js'
import { useProductsStore } from '@/stores/products.js'

const route = useRoute()
const { locale, t } = useI18n({ useScope: 'global' })
const cart = useCart()
const products = useProductsStore()
const drawerOpen = ref(false)
const searchOpen = ref(false)
const mobileSearchInput = ref(null)

const isBackoffice = computed(() => route.path.startsWith('/backoffice'))
const isShopSearchRoute = computed(() => !isBackoffice.value && route.name === 'home')
const shopLinks = computed(() => [
  { name: 'cart', label: t('navigation.cart') },
  { name: 'favourites', label: t('navigation.favourites') },
  { name: 'sales', label: t('navigation.admin') }
])
const backofficeLinks = computed(() => [
  { name: 'sales', label: t('navigation.sales') },
  { name: 'products', label: t('navigation.products') },
  { name: 'home', label: t('navigation.shop') }
])
const navigationLinks = computed(() => isBackoffice.value ? backofficeLinks.value : shopLinks.value)
const hasNoSearchResults = computed(() => products.searchQuery.length > 0 && products.filteredProducts.length === 0)

const closeOverlays = () => {
  drawerOpen.value = false
  searchOpen.value = false
}

const openSearch = async () => {
  searchOpen.value = true
  await nextTick()
  mobileSearchInput.value?.focus()
}

const submitSearch = async () => {
  searchOpen.value = false
  await nextTick()
  document.getElementById('product-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const handleKeydown = event => {
  if (event.key === 'Escape') closeOverlays()
}

const changeLocale = event => setLocale(event.target.value)

watch(() => route.fullPath, closeOverlays)
watch(searchOpen, isOpen => {
  document.body.classList.toggle('overflow-hidden', isOpen)
})

onBeforeUnmount(() => {
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <header>
    <nav class="fixed inset-x-0 top-0 z-30 border-b border-gray-200 bg-white" @keydown="handleKeydown">
      <div class="mx-auto flex max-w-screen-xl items-center justify-between gap-3 px-4 py-3">
        <Logo />

        <div v-if="isBackoffice" class="ml-auto hidden items-center gap-1 md:flex">
          <RouterLink
              v-for="link in navigationLinks"
              :key="link.name"
              :to="{ name: link.name }"
              class="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-teal-700"
          >
            {{ link.label }}
          </RouterLink>
        </div>

        <div :class="{ 'ml-auto': !isBackoffice }" class="flex items-center gap-1">
          <label v-if="isShopSearchRoute" class="relative hidden w-52 md:block xl:w-64">
            <span class="sr-only">{{ t('navigation.search') }}</span>
            <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
                v-model.trim="products.searchQuery"
                type="search"
                :placeholder="t('shop.search')"
                class="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
          </label>
          <button
              v-if="isShopSearchRoute"
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300 md:hidden"
              :aria-label="t('navigation.openSearch')"
              :title="t('navigation.openSearch')"
              @click="openSearch"
          >
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>

          <template v-if="!isBackoffice">
            <RouterLink
                :to="{ name: 'cart' }"
                class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                :aria-label="t('navigation.cart')"
                :title="t('navigation.cart')"
            >
              <ShoppingBagIcon class="h-5 w-5" />
              <span v-if="cart.items.length" class="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-bold text-white">{{ cart.items.length }}</span>
            </RouterLink>
            <RouterLink
                :to="{ name: 'favourites' }"
                class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                :aria-label="t('navigation.favourites')"
                :title="t('navigation.favourites')"
            >
              <HeartIcon class="h-5 w-5" />
              <span v-if="products.favourites.length" class="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-bold text-white">{{ products.favourites.length }}</span>
            </RouterLink>
            <RouterLink
                :to="{ name: 'sales' }"
                class="hidden h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300 md:inline-flex"
                :aria-label="t('navigation.admin')"
                :title="t('navigation.admin')"
            >
              <ShieldCheckIcon class="h-5 w-5" />
            </RouterLink>
          </template>

          <div class="relative hidden h-10 md:block" :title="t('navigation.language')">
            <ChevronDownIcon class="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <span class="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-700">{{ locale.toUpperCase() }}</span>
            <GlobeAltIcon class="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />
            <select
                :value="locale"
                class="h-10 w-20 cursor-pointer appearance-none rounded-lg border border-gray-300 bg-transparent text-transparent focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
                :aria-label="t('navigation.language')"
                @change="changeLocale"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>

          <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300 md:hidden"
              :aria-expanded="drawerOpen"
              aria-controls="mobile-navigation"
              :aria-label="drawerOpen ? t('navigation.closeMenu') : t('navigation.openMenu')"
              :title="drawerOpen ? t('navigation.closeMenu') : t('navigation.openMenu')"
              @click="drawerOpen = !drawerOpen"
          >
            <XMarkIcon v-if="drawerOpen" class="h-5 w-5" />
            <Bars3Icon v-else class="h-5 w-5" />
          </button>
        </div>

        <div v-if="drawerOpen" class="fixed inset-0 top-[65px] z-40 bg-gray-900/30 md:hidden" @click="drawerOpen = false">
          <div id="mobile-navigation" class="h-full w-72 max-w-[85vw] bg-white p-5 shadow-xl" @click.stop>
            <div class="space-y-1">
              <RouterLink
                  v-for="link in navigationLinks"
                  :key="link.name"
                  :to="{ name: link.name }"
                  class="block rounded-lg px-3 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-teal-700"
              >
                {{ link.label }}
              </RouterLink>
            </div>
            <label class="relative mt-6 flex h-10 items-center rounded-lg border border-gray-300 px-3">
              <ChevronDownIcon class="h-4 w-4 text-gray-500" />
              <span class="ml-1 text-xs font-semibold text-gray-700">{{ locale.toUpperCase() }}</span>
              <GlobeAltIcon class="ml-1 h-4 w-4 text-gray-700" />
              <span class="ml-2 text-sm text-gray-700">{{ t('navigation.language') }}</span>
              <select :value="locale" class="absolute inset-0 cursor-pointer opacity-0" :aria-label="t('navigation.language')" @change="changeLocale">
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </nav>

    <div v-if="searchOpen" class="fixed inset-0 z-50 bg-white px-4 py-5 md:hidden" @keydown="handleKeydown">
      <div class="mx-auto max-w-screen-sm">
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-lg font-semibold text-gray-900">{{ t('shop.search') }}</h2>
          <button type="button" class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-300" :aria-label="t('navigation.closeSearch')" :title="t('navigation.closeSearch')" @click="searchOpen = false">
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
        <form class="mt-6" @submit.prevent="submitSearch">
          <label class="relative block">
            <span class="sr-only">{{ t('shop.search') }}</span>
            <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input ref="mobileSearchInput" v-model.trim="products.searchQuery" type="search" :placeholder="t('shop.search')" class="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200" />
          </label>
          <p v-if="hasNoSearchResults" class="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            <span class="block font-medium">{{ t('shop.noProducts') }}</span>
            {{ t('shop.tryDifferentFilter') }}
          </p>
          <button type="submit" class="mt-4 flex w-full items-center justify-center rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300">
            {{ t('shop.search') }}
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
