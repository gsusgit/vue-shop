import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { query, collection, where } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

export const useSales = defineStore('sales', () => {

    const date = ref('')
    const db = useFirestore()

    const salesSource = computed(() => {
        if (date.value) {
           return query(
                collection(db, 'sales'),
                where('date', '==', date.value)
            )}
    })

    const salesCollection = useCollection(salesSource)

    const isDateSelected = computed(() => date.value)

    const noSalesForSelectedDate = computed(() => {
        return date.value && salesCollection.value.length === 0
    })

    const totalSalesForSelectedDate = computed(() => {
        return salesCollection.value ? salesCollection.value.reduce((total, sale) => total + sale.total, 0) : 0
    })

    return {
        date,
        isDateSelected,
        salesCollection,
        noSalesForSelectedDate,
        totalSalesForSelectedDate
    }
})
