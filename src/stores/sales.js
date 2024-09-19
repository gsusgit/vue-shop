import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { query, collection, where, deleteDoc, getDocs } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

export const useSales = defineStore('sales', () => {

    const date = ref('')
    const db = useFirestore()
    const hasDocuments = ref(false)

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

    const checkDocuments = async () => {
        const colRef = collection(db, 'sales');
        const snapshot = await getDocs(colRef);
        hasDocuments.value = !snapshot.empty; // Update based on whether the collection is empty
    };

    const areDocumentsAvailable = computed(() => hasDocuments.value)

    const removeSales = async () => {
        localStorage.removeItem('cartItems')
        localStorage.removeItem('favourites')
        const colRef = collection(db, 'sales')
        try {
            const snapshot = await getDocs(colRef)
            snapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref)
            })
        } catch (error) {
            console.error("Error deleting documents: ", error)
        }
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
