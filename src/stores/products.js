import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import useLocalStorageRef from '@/composables/useLocalStorageRef.js'
import * as mockDb from '@/data/mockDb.js'
import { i18n } from '@/i18n'

export const useProductsStore = defineStore('products', () => {

    const categories = [
        { id: 1, labelKey: 'products.categorySneakers' },
        { id: 2, labelKey: 'products.categoryClothing' },
        { id: 3, labelKey: 'products.categoryApparel' }
    ]

    const searchQuery = ref('')

    const selectedCategory = useLocalStorageRef('selectedCategory', 0)
    if (!categories.some(category => category.id === selectedCategory.value) && selectedCategory.value !== 0) {
        selectedCategory.value = 0
    }

    const favourites = useLocalStorageRef('favourites', [])

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
            label: i18n.global.t(category.labelKey),
            value: category.id
        }))
    })

    const productsCollection = computed(() => mockDb.getProducts())

    const searchedProducts = computed(() => mockDb.searchProducts(searchQuery.value))

    const filteredProducts = computed(() => {
        if (selectedCategory.value === 0) {
            return searchedProducts.value
        }

        return searchedProducts.value.filter(product => product.category === selectedCategory.value)
    })

    const categoryOptions = computed(() => {
        return [
            {
                label: i18n.global.t('common.selectCategory'),
                value: '',
                attrs: {
                    disabled: true,
                }
            },
            ...categories.map(category => ({
                label: i18n.global.t(category.labelKey),
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
        searchQuery,
        selectedCategory,
        favourites
    }
})
