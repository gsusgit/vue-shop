import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import useToast from '@/composables/useToast.js'

export const useCart = defineStore('cart', () => {

    const items = ref([])
    const subTotal = ref(0)
    const taxes = ref(0)
    const total = ref(0)
    const MAX_PRODUCTS = 5
    const TAX_RATE = .10
    const { show } = useToast()

    function addItem(item) {
        const index = isItemInCart(item.id)
        if(index >= 0) {
            if(isProductAvailable( item, index )) {
                show('Maximum items reached', 'error')
                return
            }
            items.value[index].quantity++
        } else {
            items.value.push({...item, quantity: 1, id: item.id})
        }
    }

    const isItemInCart = id => {
        return items.value.findIndex(item => item.id === id)
    }

    function updateQuantity(id, quantity) {
        items.value = items.value.map(item => item.id === id ? {...item, quantity} : item)
    }

    const isEmpty = computed(() => {
        return items.value.length === 0
    })

    const checkProductAvailability = computed(() => {
        return (product) => product.stock < MAX_PRODUCTS ? product.stock : MAX_PRODUCTS
    })

    const isProductAvailable = ( item, index ) => {
        return items.value[index].quantity >= item.stock || items.value[index].quantity >= MAX_PRODUCTS
    }

    function removeItem(id) {
        items.value = items.value.filter(item => item.id !== id)
    }

    watch(items, () => {
        subTotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
        taxes.value = subTotal.value * TAX_RATE
        total.value = subTotal.value + taxes.value
    }, {
        deep: true
    })

    return {
        addItem,
        updateQuantity,
        removeItem,
        items,
        isEmpty,
        checkProductAvailability,
        subTotal,
        taxes,
        total
    }
})
