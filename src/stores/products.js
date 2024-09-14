import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'

export const useProductsStore = defineStore('products', () => {

    const categories = [
        {id: 1, name: 'Shoes'},
        {id: 2, name: 'Hoodies'},
        {id: 3, name: 'Sunglasses'}
    ]

    const db = useFirestore()

    async function createProduct(product) {
        await addDoc(collection(db, 'products'), product)
    }

    const filterCategories = computed(() => {
        return categories.map(category => ({
            label: category.name,
            value: category.id
        }))
    })

    const categoryOptions = computed(() => {
        return [
            {
                label: 'Select category',
                value: '',
                attrs: {
                    disabled: true,
                }
            },
            ...categories.map(category => ({
                label: category.name,
                value: category.id
            }))
        ]
    })

    return {
        createProduct,
        filterCategories,
        categoryOptions
    }
})
