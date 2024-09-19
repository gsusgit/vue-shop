import { ref, watch } from 'vue'
import { useProductsStore } from '@/stores/products.js'


export default function useProductsTable() {

    const products = useProductsStore()
    const allChecked = ref(false)
    const selectedProducts = ref([])

    function checkAll() {
        allChecked.value = !allChecked.value
        if (allChecked.value) {
            selectedProducts.value = products.productsCollection.map(product => ({
                id: product.id,
                image: product.image
            }))
        } else {
            selectedProducts.value = []
        }
    }

    function uncheckAll() {
        allChecked.value = false
        selectedProducts.value = []
    }

    function toggleProductSelection(product) {
        const index = selectedProducts.value.findIndex(p => p.id === product.id)
        if (index > -1) {
            selectedProducts.value.splice(index, 1)
        } else {
            selectedProducts.value.push({
                id: product.id,
                image: product.image
            })
        }
    }

    watch(selectedProducts, (newSelectedProducts) => {
        allChecked.value = newSelectedProducts.length === products.productsCollection.length
    })

    watch(() => products.productsCollection.length, () => {
        allChecked.value = selectedProducts.value.length === products.productsCollection.length
    })

    const isProductSelected = (product) => {
        return selectedProducts.value.some(p => p.id === product.id)
    }

    return {
        checkAll,
        uncheckAll,
        allChecked,
        selectedProducts,
        toggleProductSelection,
        isProductSelected
    }
}
