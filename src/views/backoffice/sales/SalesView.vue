<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import VueTailwindDatePicker from 'vue-tailwind-datepicker'
import PageTitle from '@/components/layout/base/PageTitle.vue'
import Spinner from '@/components/layout/shared/Spinner.vue'
import Dialog from '@/components/layout/shared/Dialog.vue'
import Sale from '@/components/ui/backoffice/Sale.vue'
import { useSales } from '@/stores/sales.js'
import { formatCurrency } from '@/lib/helpers.js'
import useToast from '@/composables/useToast.js'

const loading = ref(true)
const calendarOpen = ref(false)
const sales = useSales()
const { locale, t } = useI18n()
const { show } = useToast()
const modal = ref({ message: '', show: false })
const showRemoveButton = ref(true)
const formatter = ref({ date: 'DD/MM/YYYY', month: 'MMMM' })
const datePickerOptions = computed(() => ({
  shortcuts: {
    today: t('calendar.today'),
    yesterday: t('calendar.yesterday'),
    past: count => t('calendar.lastDays', { count }),
    currentMonth: t('calendar.thisMonth'),
    pastMonth: t('calendar.lastMonth')
  }
}))

onMounted(() => {
  sales.checkDocuments()
  setTimeout(() => { loading.value = false }, 1000)
})

const confirmSalesRemoval = () => {
  modal.value.show = false
  modal.value.message = ''
  sales.removeSales()
  show(t('sales.removed'), 'success')
  showRemoveButton.value = false
}

const removeSales = () => {
  modal.value.show = true
  modal.value.message = t('sales.confirmRemoval')
}
</script>

<template>
  <Dialog :modal="modal" @confirm-product-removal="confirmSalesRemoval" />
  <div v-if="loading"><Spinner /></div>
  <div v-else>
    <PageTitle :title="t('navigation.sales')" :parent-title="t('navigation.admin')" />
    <div v-if="sales.areDocumentsAvailable && showRemoveButton" class="my-4">
      <button class="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300" @click="removeSales">
        {{ t('common.removeAll') }}
      </button>
    </div>

    <div class="mt-5 lg:grid lg:grid-cols-[minmax(18rem,22rem)_minmax(0,1fr)] lg:items-start lg:gap-8">
      <section class="lg:sticky lg:top-20">
        <button
            type="button"
            class="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left text-sm font-medium text-gray-800 shadow-sm sm:hidden"
            :aria-expanded="calendarOpen"
            @click="calendarOpen = !calendarOpen"
        >
          {{ t('sales.selectRange') }}
          <span aria-hidden="true">{{ calendarOpen ? '−' : '+' }}</span>
        </button>
        <div :class="{ hidden: !calendarOpen }" class="mt-3 overflow-x-auto rounded-lg border border-gray-200 bg-white p-2 shadow-sm sm:mt-0 sm:block">
          <VueTailwindDatePicker
              v-model="sales.dateRange"
              no-input
              use-range
              as-single
              :i18n="locale"
              :options="datePickerOptions"
              :formatter="formatter"
          />
        </div>
      </section>

      <section class="mt-6 min-w-0 pb-20 lg:mt-0">
        <div v-if="!sales.isDateRangeSelected" class="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
          <h2 class="text-lg font-semibold text-gray-900">{{ t('sales.selectRange') }}</h2>
          <p class="mt-1 text-sm">{{ t('sales.selectRangeHelp') }}</p>
        </div>
        <template v-else>
          <p class="mb-5 text-lg font-bold">{{ t('common.total') }}: {{ formatCurrency(sales.totalSalesForDateRange) }}</p>
          <div v-if="!sales.noSalesForSelectedDateRange" class="space-y-5 lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto lg:pr-2">
            <Sale v-for="sale in sales.salesForDateRange" :key="sale.invoice" :sale="sale" />
          </div>
          <div v-else class="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
            <h2 class="text-lg font-semibold text-gray-900">{{ t('sales.noSales') }}</h2>
            <p class="mt-1 text-sm text-gray-500">{{ t('sales.noSalesHelp') }}</p>
          </div>
        </template>
      </section>
    </div>
  </div>
</template>
