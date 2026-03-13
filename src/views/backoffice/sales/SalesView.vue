<script setup>
import { onMounted, ref } from 'vue'
import VueTailwindDatePicker from 'vue-tailwind-datepicker'
import PageTitle from '@/components/layout/base/PageTitle.vue'
import Spinner from '@/components/layout/shared/Spinner.vue'
import { useSales } from '@/stores/sales.js'
import Sale from '@/components/ui/backoffice/Sale.vue'
import { formatCurrency, getCurrentDate } from '@/lib/helpers.js'
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
    month: 'MMMM'
})

onMounted(() => {
    sales.checkDocuments()
    if (!sales.date) {
        sales.date = getCurrentDate()
    }
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
    <Dialog :modal="modal" @confirm-product-removal="confirmSalesRemoval" />
    <div v-if="loading">
        <Spinner />
    </div>
    <div v-else>
        <PageTitle title="Sales" parentTitle="Admin" />
        <div
            v-if="sales.areDocumentsAvailable && showRemoveButton"
            class="my-4 ms-auto">
            <button
                class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                @click="removeSales">
                Remove all sales
            </button>
        </div>
        <div v-if="sales.isDateSelected">
            <p
                v-if="sales.totalSalesForSelectedDate > 0"
                class="mt-5 text-lg font-bold">
                Total: {{ formatCurrency(sales.totalSalesForSelectedDate) }}
            </p>
        </div>
        <div v-else>
            <h3 class="text-lg font-medium text-red-800">
                Please select date...
            </h3>
        </div>
        <div class="mt-5 lg:mt-0 md:flex md:items-start gap-10 h-full">
            <div class="md:w-1/2 lg:w-1/4 flex h-full sticky top-5">
                <VueTailwindDatePicker
                    v-model="sales.date"
                    as-single
                    no-input
                    :formatter="formatter" />
            </div>
            <div class="md:w-1/2 lg:w-3/4 px-5 pb-32">
                <div
                    v-if="sales.isDateSelected && !sales.noSalesForSelectedDate"
                    class="space-y-5 max-h-[70vh] overflow-y-auto">
                    <Sale v-for="sale in sales.salesCollection" :sale="sale" />
                </div>
                <div
                    v-else-if="
                        sales.isDateSelected && sales.noSalesForSelectedDate
                    "
                    class="mt-5 lg:mt-0 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center p-8 text-center text-gray-600 opacity-50">
                    <svg
                        class="w-8 h-8 mb-3 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M5 12h14M5 8h10m-7 8h11" />
                    </svg>
                    <h3 class="text-lg font-semibold mb-1">
                        There are no sales for the selected date
                    </h3>
                    <p class="text-sm text-gray-500">
                        Try selecting another date in the calendar.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
