<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProductsStore } from '@/stores/products.js'
import PageTitle from '@/components/layout/base/PageTitle.vue'
import ProductList from '@/components/ui/backoffice/ProductList.vue'
import Notification from '@/components/layout/shared/Notification.vue'
import Spinner from '@/components/layout/shared/Spinner.vue'
import useToast from '@/composables/useToast.js'

const products = useProductsStore()
const { show } = useToast()
const { t } = useI18n()

const notification = computed(() => ({
  title: t('shop.storeEmpty'),
  message: t('products.emptyMessage'),
  button1: {
    text: t('products.startAdding'),
    route: ''
  },
  button2: {
    text: t('products.importDemo'),
    route: 'import-demo'
  }
}))

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    if (localStorage.getItem('demoImported') === '1' && products.productsCollection.length > 0) {
      show(t('products.imported'), 'success')
      localStorage.removeItem('demoImported')
    }
  }, 1500)
})
</script>

<template>
  <div v-if="!loading">
    <PageTitle :title="t('navigation.products')" :parentTitle="t('navigation.admin')"/>
    <div class="mt-5">
      <RouterLink v-if="products.productsCollection.length > 0" :to="{name: 'new-product'}">
        <button type="button" class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300">
          {{ t('products.addNew') }}
        </button>
      </RouterLink>
      <Notification
          v-else
          :notification="notification"/>
    </div>
    <ProductList />
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>
