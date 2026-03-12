import { computed, onMounted, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import * as mockDb from '@/data/mockDb.js'

export const useProductsStore = defineStore('products', () => {

    const categories = [
        {id: 1, name: 'Sneakers'},
        {id: 2, name: 'Clothing'},
        {id: 3, name: 'Appareal'}
    ]

    const categoryFilter = ref('')

    const selectedCategory = ref(0)

    const favourites = ref([])

    async function createProduct(product) {
        mockDb.addProduct(product)
    }

    async function updateProduct(id, product) {
        try {
            mockDb.updateProduct(id, product)
        } catch (error) {
            console.log(error)
        }
    }

    const getProduct = async (id) => {
        const p = mockDb.getProduct(id)
        return p ? { ...p } : null
    }

    const removeProduct = async (id, _imageUrl) => {
        localStorage.removeItem('cartItems')
        localStorage.removeItem('favourites')
        mockDb.removeProduct(id)
    }

    const filterCategories = computed(() => {
        return categories.map(category => ({
            label: category.name,
            value: category.id
        }))
    })

    const productsCollection = computed(() => {
        const list = mockDb.products.value
        return categoryFilter.value ? list.filter(product => product.category) : list
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

    const relatedProducts = (id) =>
        filteredProducts.value.filter(p => p.id !== id)


    return {
        createProduct,
        updateProduct,
        removeProduct,
        addToFavourites,
        removeFromFavourites,
        isFavourite,
        getProduct,
        relatedProducts,
        filteredProducts,
        filterCategories,
        categoryOptions,
        productsCollection,
        selectedCategory,
        favourites
    }
})
