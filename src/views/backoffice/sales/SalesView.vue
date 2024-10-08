<script setup>
import { onMounted, ref } from 'vue'
import VueTailwindDatePicker from 'vue-tailwind-datepicker'
import PageTitle from '@/components/layout/base/PageTitle.vue'
import Spinner from '@/components/layout/shared/Spinner.vue'
import { useSales } from '@/stores/sales.js'
import Sale from '@/components/ui/backoffice/Sale.vue'
import { formatCurrency } from '@/lib/helpers.js'
import Dialog from '@/components/layout/shared/Dialog.vue'
import useToast from '@/composables/useToast.js'

const loading = ref(true)
const sales = useSales()
const { show } = useToast()
const modal = ref({
  message: '',
  show: false
})
const showRemoveButton = ref(true)
const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMMM',
})

onMounted(() => {
  sales.checkDocuments()
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

const confirmSalesRemoval = () => {
  localStorage.removeItem('cartItems')
  localStorage.removeItem('favourites')
  modal.value.show = false
  modal.message = ''
  sales.removeSales()
  show('Sales were removed', 'success')
  showRemoveButton.value = false
}

const removeSales = () => {
  modal.value.show = true
  modal.value.message = 'Are you sure you want to delete all sales?'
}

</script>

<template>
  <Dialog
      :modal="modal"
      @confirm-product-removal="confirmSalesRemoval"
  />
  <div v-if="loading">
    <Spinner />
  </div>
  <div v-else>
    <PageTitle title="Sales" parentTitle="Admin" />
    <div
        v-if="sales.areDocumentsAvailable && showRemoveButton"
        class="my-4 ms-auto"
    >
      <button
          class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          @click="removeSales"
      >
        Remove all sales
      </button>
    </div>
    <div v-if="sales.isDateSelected">
      <p v-if="sales.totalSalesForSelectedDate > 0" class="mt-5 text-lg font-bold">Total: {{ formatCurrency(sales.totalSalesForSelectedDate) }}</p>
      <div v-else class="mt-5 flex items-center">
        <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <h3 class="text-lg font-medium">No sales for selected date</h3>
      </div>
    </div>
    <div v-else>
      <h3 class="text-lg font-medium text-red-800">Please select date...</h3>
    </div>
    <!-- este div ahora está fijo -->
    <div class="mt-5 md:flex md:items-start gap-10 h-full">
      <div class="md:w-1/2 lg:w-1/4 flex h-full sticky top-5">
        <VueTailwindDatePicker
            v-model="sales.date"
            as-single
            no-input
            :formatter="formatter"
        />
      </div>
      <!-- este div hace scroll -->
      <div v-if="!sales.noSalesForSelectedDate" class="md:w-1/2 lg:w-3/4 space-y-5 h-full lg:h-screen lg:overflow-y-scroll px-5 pb-32">
        <Sale
            v-for="sale in sales.salesCollection"
            :sale="sale"
        />
      </div>
    </div>
  </div>
</template>

