import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCart } from './cart'

export const useCouponStore = defineStore('coupon', () => {

    const cart = useCart()
    const couponInput = ref('')
    const couponValidationMessage = ref('')
    const discountPercentage  = ref(0)
    const discount = ref(0)
    const discountDescription = ref('')

    const VALID_COUPONS = [
        { name: '10SALE', discount: .10},
        { name: '20SALE', discount: .20},
    ]

    watch(discountPercentage, () => {
        discount.value = (cart.total * discountPercentage.value ).toFixed(2)
        discountDescription.value = (discountPercentage.value * 100) + '% OFF'
    })

    function applyCoupon() {
        if(VALID_COUPONS.some(coupon => coupon.name === couponInput.value )) {
            couponValidationMessage.value = 'Applying coupon...'

            setTimeout(() => {
                discountPercentage.value = VALID_COUPONS.find(coupon => coupon.name === couponInput.value).discount
                couponValidationMessage.value = 'Discount applyed!'
            }, 3000);

        } else {
            couponValidationMessage.value = 'Invalid coupon'
        }
        setTimeout(() => {
            couponValidationMessage.value = ''
        }, 6000);
    }

    function $reset() {
        couponInput.value = ''
        couponValidationMessage.value = ''
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
        couponValidationMessage,
        isValidCoupon
    }
})
