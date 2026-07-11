import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import useLocalStorageRef from '@/composables/useLocalStorageRef.js'
import useToast from '@/composables/useToast.js'
import { useCouponStore } from '@/stores/voucher.js'
import { getCurrentDate } from '@/lib/helpers.js'
import * as mockDb from '@/data/mockDb.js'
import { i18n } from '@/i18n'

export const useCart = defineStore('cart', () => {
    const items = useLocalStorageRef('cartItems', [])
    const subtotal = ref(0)
    const taxes = ref(0)
    const total = ref(0)
    const MAX_PRODUCTS = 5
    const TAX_RATE = .10
    const coupon = useCouponStore()
    const { show } = useToast()
    const processingPayment = ref(false)

    watchEffect(() => {
        subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0 )
        coupon.recalculateSavings()
        taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2))
        total.value = Number(((subtotal.value + taxes.value) - coupon.discount).toFixed(2))
    })


    function addItem(item) {
        if (!item || item.stock <= 0) {
            show(i18n.global.t('cart.outOfStock'), 'error')
            return false
        }

        const index = isItemInCart(item.id)
        if(index >= 0) {
            if(isProductAvailable(item, index)) {
                show(i18n.global.t('cart.maximumReached'), 'error')
                return false
            }
            items.value[index].quantity++
        } else {
            items.value.push({...item, quantity: 1, id: item.id})
        }

        return true
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

    const isProductAvailable = (item, index) => {
        return items.value[index].quantity >= item.stock || items.value[index].quantity >= MAX_PRODUCTS
    }

    function removeItem(id) {
        items.value = items.value.filter(item => item.id !== id)
    }

    const generateInvoiceNumber = async (dateStr) => {
        const daySales = mockDb.getSalesByDate(dateStr)
        const salesCount = daySales.length
        return dateStr.split('/').join('') + '-' + (salesCount + 1)
    }

    async function completeCheckout() {
        if (items.value.length === 0) {
            throw new Error(i18n.global.t('cart.emptyCheckout'))
        }

        const unavailableItem = items.value.find(item => {
            const product = mockDb.getProduct(item.id)
            return !product || product.stock < item.quantity
        })

        if (unavailableItem) {
            throw new Error(i18n.global.t('cart.insufficientStock', { name: unavailableItem.name }))
        }

        processingPayment.value = true

        try {
            await new Promise(resolve => setTimeout(resolve, 1500))

            const date = getCurrentDate()
            const sale = {
                items: items.value.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                subtotal: subtotal.value,
                taxes: taxes.value,
                discount: coupon.discount,
                total: total.value,
                date,
                invoice: await generateInvoiceNumber(date)
            }

            mockDb.addSale(sale)
            items.value.forEach(item => {
                const product = mockDb.getProduct(item.id)
                mockDb.updateProduct(item.id, { stock: product.stock - item.quantity })
            })

            $reset()
            coupon.$reset()
            return sale
        } finally {
            processingPayment.value = false
        }
    }

    function $reset() {
        subtotal.value = 0
        taxes.value = 0
        total.value = 0
        items.value = []
    }

    return {
        addItem,
        updateQuantity,
        removeItem,
        completeCheckout,
        $reset,
        items,
        isEmpty,
        checkProductAvailability,
        subtotal,
        taxes,
        total,
        processingPayment
    }
})
