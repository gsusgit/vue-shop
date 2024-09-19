import { defineStore } from 'pinia'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import useToast from '@/composables/useToast.js'
import { useCouponStore } from '@/stores/voucher.js'
import { addDoc, collection, doc, runTransaction, query, where, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { getCurrentDate } from '@/lib/helpers.js'
import { useSales } from '@/stores/sales.js'

export const useCart = defineStore('cart', () => {
    const items = ref([])
    const subtotal = ref(0)
    const taxes = ref(0)
    const total = ref(0)
    const MAX_PRODUCTS = 5
    const TAX_RATE = .10
    const coupon = useCouponStore()
    const sales = useSales()
    const { show } = useToast()
    const db = useFirestore()
    const processingPayment = ref(false)

    watchEffect(() => {
        subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0 )
        coupon.recalculateSavings()
        taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2))
        total.value = Number(((subtotal.value + taxes.value) - coupon.discount).toFixed(2))
    })

    watch(items, (newItems) => {
        localStorage.setItem('cartItems', JSON.stringify(newItems))
    }, { deep: true })

    onMounted(() => {
        const savedItems = localStorage.getItem('cartItems')
        if (savedItems) {
            items.value = JSON.parse(savedItems)
        }
    })

    function addItem(item) {
        const index = isItemInCart(item.id)
        if(index >= 0) {
            if(isProductAvailable(item, index)) {
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

    const isProductAvailable = (item, index) => {
        return items.value[index].quantity >= item.stock || items.value[index].quantity >= MAX_PRODUCTS
    }

    function removeItem(id) {
        items.value = items.value.filter(item => item.id !== id)
    }

    const generateInvoiceNumber = async (dateStr) => {
        const q = query(collection(db, 'sales'), where('date', '==', dateStr))
        const querySnapshot = await getDocs(q)
        const salesCount = querySnapshot.size
        return dateStr.split('/').join('') + '-' + (salesCount + 1)
    }

    async function checkOut() {
        processingPayment.value = true
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
            date : getCurrentDate(),
            invoice : await generateInvoiceNumber(getCurrentDate())
        }
        try {
            await addDoc(collection(db, 'sales'), sale)
            items.value.forEach(async (item) => {
                const productRef = doc(db, 'products', item.id)
                await runTransaction(db, async(transaction) => {
                    const currentProduct = await transaction.get(productRef)
                    const availability = currentProduct.data().stock - item.quantity
                    transaction.update(productRef, {stock: availability})
                })
            })
            setTimeout(() => {
                processingPayment.value = false
                $reset()
                coupon.$reset()
            }, 3000)
        } catch (error) {
            console.log(error)
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
        checkOut,
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
