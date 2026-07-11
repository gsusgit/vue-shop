import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as mockDb from '@/data/mockDb.js'

export const useSales = defineStore('sales', () => {

    const dateRange = ref([])
    const hasDocuments = ref(false)

    const isDateRangeSelected = computed(() => {
        return Array.isArray(dateRange.value) && dateRange.value.length === 2 && dateRange.value.every(Boolean)
    })

    const salesForDateRange = computed(() => {
        void mockDb.sales.value
        if (!isDateRangeSelected.value) return []
        return mockDb.getSalesByDateRange(dateRange.value[0], dateRange.value[1])
    })

    const noSalesForSelectedDateRange = computed(() => {
        return isDateRangeSelected.value && salesForDateRange.value.length === 0
    })

    const totalSalesForDateRange = computed(() => {
        return salesForDateRange.value.reduce((total, sale) => total + Number(sale.total), 0)
    })

    const checkDocuments = async () => {
        const all = mockDb.getSales()
        hasDocuments.value = all.length > 0
    }

    const areDocumentsAvailable = computed(() => hasDocuments.value)

    const removeSales = async () => {
        localStorage.removeItem('cartItems')
        localStorage.removeItem('favourites')
        mockDb.removeAllSales()
    }

    return {
        dateRange,
        isDateRangeSelected,
        salesForDateRange,
        noSalesForSelectedDateRange,
        totalSalesForDateRange,
        areDocumentsAvailable,
        checkDocuments,
        removeSales
    }
})
