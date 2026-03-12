import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as mockDb from '@/data/mockDb.js'

export const useSales = defineStore('sales', () => {

    const date = ref('')
    const hasDocuments = ref(false)

    const salesCollection = computed(() => {
        void mockDb.sales.value
        if (!date.value) return []
        return mockDb.getSalesByDate(date.value)
    })

    const isDateSelected = computed(() => date.value)

    const noSalesForSelectedDate = computed(() => {
        return date.value && salesCollection.value.length === 0
    })

    const totalSalesForSelectedDate = computed(() => {
        return salesCollection.value ? salesCollection.value.reduce((total, sale) => total + sale.total, 0) : 0
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
        date,
        isDateSelected,
        salesCollection,
        noSalesForSelectedDate,
        totalSalesForSelectedDate,
        areDocumentsAvailable,
        checkDocuments,
        removeSales
    }
})
