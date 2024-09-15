import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'

export const useProductsStore = defineStore('products', () => {

    const categories = [
        {id: 1, name: 'Shoes'},
        {id: 2, name: 'Hoodies'},
        {id: 3, name: 'Sunglasses'}
    ]

    const db = useFirestore()

    const storage = useFirebaseStorage()

    const products = useCollection(collection(db, 'products'))

    const categoryFilter = ref('')

    async function createProduct(product) {
        await addDoc(collection(db, 'products'), product)
    }

    async function updateProduct(docRef, product) {
        try {
            await updateDoc(docRef, product)
        } catch (error) {
            console.log(error)
        }
    }

    const removeProduct = async (id, imageUrl) => {
        const imageRef = storageRef(storage, imageUrl)
        const docRef = doc(db, 'products', id)
        await deleteDoc(docRef)
        await deleteObject(imageRef)
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

    const productsCollection = computed(() => {
        return categoryFilter.value ? products.value.filter(product => product.category) : products.value
    })

    return {
        createProduct,
        updateProduct,
        removeProduct,
        filterCategories,
        categoryOptions,
        productsCollection
    }
})
