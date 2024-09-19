import { ref, computed, watch } from 'vue'
import { useProductsStore } from '@/stores/products.js'

export default function useProductsTable() {
    const products = useProductsStore()

    const allChecked = ref(false)
    const selectedProducts = ref([])

    function checkAll() {
        allChecked.value = !allChecked.value
        if (allChecked.value) {
            selectedProducts.value = products.productsCollection.map(product => product.id)
        } else {
            selectedProducts.value = []
        }
    }

    function toggleProductSelection(productId) {
        const index = selectedProducts.value.indexOf(productId)
        if (index > -1) {
            selectedProducts.value.splice(index, 1)
        } else {
            selectedProducts.value.push(productId)
        }
    }

    watch(selectedProducts, (newSelectedProducts) => {
        allChecked.value = newSelectedProducts.length === products.productsCollection.length
    })

    watch(() => products.productsCollection.length, () => {
        allChecked.value = selectedProducts.value.length === products.productsCollection.length
    })

    const getSelectedProducts = computed(() => {
        return products.productsCollection.filter(product => selectedProducts.value.includes(product.id))
    })

    return {
        checkAll,
        allChecked,
        selectedProducts,
        toggleProductSelection,
        getSelectedProducts
    }
}
