import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCart } from './cart'

export const useCouponStore = defineStore('coupon', () => {

    const cart = useCart()
    const couponInput = ref('')
    const discountPercentage  = ref(0)
    const discount = ref(0)
    const discountDescription = ref('')
    const applyingDiscount = ref(false)
    const showError = ref(false)

    const VALID_COUPONS = [
        { name: '10SALE', discount: .10},
        { name: '20SALE', discount: .20},
    ]

    watch(discountPercentage, () => {
        discount.value = (cart.subtotal * discountPercentage.value ).toFixed(2)
        discountDescription.value = (discountPercentage.value * 100) + '% OFF'
    })

    function recalculateSavings() {
        discount.value = (cart.subtotal * discountPercentage.value ).toFixed(2)
    }

    function applyCoupon() {
        showError.value = false
        applyingDiscount.value = true
        if(VALID_COUPONS.some(coupon => coupon.name === couponInput.value )) {
            setTimeout(() => {
                discountPercentage.value = VALID_COUPONS.find(coupon => coupon.name === couponInput.value).discount
                applyingDiscount.value = false
            }, 3000)

        } else {
            setTimeout(() => {
                showError.value = true
                applyingDiscount.value = false
                discountDescription.value = 'Coupon not valid'
            }, 3000)
        }
    }

    function $reset() {
        couponInput.value = ''
        applyingDiscount.value = false
        discountPercentage.value  = 0
        discount.value = 0
    }

    const isValidCoupon = computed(() => discountPercentage.value > 0 )

    return {
        couponInput,
        discount,
        discountDescription,
        applyCoupon,
        $reset,
        recalculateSavings,
        applyingDiscount,
        isValidCoupon,
        showError
    }
})
