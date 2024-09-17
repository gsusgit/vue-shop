import { computed, onMounted, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'

export const useProductsStore = defineStore('products', () => {

    const categories = [
        {id: 1, name: 'Sneakers'},
        {id: 2, name: 'Clothing'},
        {id: 3, name: 'Appareal'}
    ]

    const db = useFirestore()

    const storage = useFirebaseStorage()

    const products = useCollection(collection(db, 'products'))

    const categoryFilter = ref('')

    const selectedCategory = ref(0)

    const favourites = ref([])

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

    const filteredProducts = computed(() => {
        if (selectedCategory.value === 0) {
            return productsCollection.value
        } else {
            return productsCollection.value.filter(product => product.category === selectedCategory.value)
        }
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

    const addToFavourites = (product, id) => {
        favourites.value.push({...product, id: id})
    }

    const removeFromFavourites = (product) => {
        favourites.value = favourites.value.filter(favourite => favourite.id !== product.id)
    }

    watch(favourites, (newItems) => {
        localStorage.setItem('favourites', JSON.stringify(newItems))
    }, { deep: true })

    onMounted(() => {
        const savedItems = localStorage.getItem('favourites')
        if (savedItems) {
            favourites.value = JSON.parse(savedItems)
        }
    })

    const isFavourite = (product) => {
        return favourites.value.some(item => item.id === product.id)
    }

    return {
        createProduct,
        updateProduct,
        removeProduct,
        addToFavourites,
        removeFromFavourites,
        isFavourite,
        filteredProducts,
        filterCategories,
        categoryOptions,
        productsCollection,
        selectedCategory,
        favourites
    }
})
