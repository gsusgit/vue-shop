<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeftIcon, CheckCircleIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
import { useCart } from '@/stores/cart.js'
import { useCouponStore } from '@/stores/voucher.js'
import { formatCurrency } from '@/lib/helpers.js'
import { useI18n } from 'vue-i18n'
import Voucher from '@/components/ui/shop/Voucher.vue'

const router = useRouter()
const cart = useCart()
const coupon = useCouponStore()
const { t } = useI18n()
const paymentError = ref('')
const completedSale = ref(null)
const formData = reactive({
  cardholder: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

const isValidCardNumber = node => {
  const digits = String(node.value ?? '').replace(/\D/g, '')
  if (!/^\d{16}$/.test(digits)) return false

  return digits
      .split('')
      .reverse()
      .reduce((sum, digit, index) => {
        let value = Number(digit)
        if (index % 2 === 1) value *= 2
        return sum + (value > 9 ? value - 9 : value)
      }, 0) % 10 === 0
}

const isValidExpiryDate = node => {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(String(node.value ?? ''))
  if (!match) return false

  const [, month, year] = match.map(Number)
  const now = new Date()
  const currentYear = now.getFullYear() % 100
  const currentMonth = now.getMonth() + 1

  return year > currentYear || (year === currentYear && month >= currentMonth)
}

const isValidCvv = node => /^\d{3}$/.test(String(node.value ?? ''))

const cardNumber = computed({
  get: () => formData.cardNumber,
  set: value => {
    const digits = String(value ?? '').replace(/\D/g, '').slice(0, 16)
    formData.cardNumber = digits.replace(/(.{4})/g, '$1 ').trim()
  }
})

const expiryDate = computed({
  get: () => formData.expiryDate,
  set: value => {
    const digits = String(value ?? '').replace(/\D/g, '').slice(0, 4)
    formData.expiryDate = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
  }
})

const cancel = () => router.push({ name: 'cart' })

const submitPayment = async () => {
  if (coupon.applyingDiscount) return

  paymentError.value = ''

  try {
    completedSale.value = await cart.completeCheckout()
  } catch (error) {
    paymentError.value = error.message || t('cart.emptyCheckout')
  }
}

onMounted(() => {
  if (cart.isEmpty) {
    router.replace({ name: 'cart' })
  }
})
</script>

<template>
  <main class="min-h-screen bg-gray-100 px-4 py-8 sm:py-12">
    <div class="mx-auto max-w-5xl">
      <header class="mb-8 flex items-center justify-between">
        <button
            v-if="!completedSale"
            type="button"
            class="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
            :disabled="cart.processingPayment"
            @click="cancel"
        >
          <ArrowLeftIcon class="h-5 w-5" />
          {{ t('checkout.returnToCart') }}
        </button>
        <div class="ml-auto flex items-center gap-2 text-sm font-semibold text-gray-900">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">V</span>
          {{ t('checkout.bankName') }}
        </div>
      </header>

      <div v-if="completedSale" class="mx-auto max-w-lg rounded-xl bg-white p-8 text-center shadow-sm">
        <CheckCircleIcon class="mx-auto h-14 w-14 text-teal-600" />
        <h1 class="mt-4 text-2xl font-bold text-gray-900">{{ t('checkout.approved') }}</h1>
        <p class="mt-2 text-gray-600">{{ t('checkout.orderPlaced') }}</p>
        <p class="mt-5 text-sm text-gray-500">Invoice #{{ completedSale.invoice }}</p>
        <p class="mt-1 text-xl font-bold text-gray-900">{{ formatCurrency(completedSale.total) }}</p>
        <button
            type="button"
            class="mt-7 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300"
            @click="router.push({ name: 'home' })"
        >
          {{ t('common.continueShopping') }}
        </button>
      </div>

      <div v-else class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section class="rounded-xl bg-white p-6 shadow-sm sm:p-8">
          <div class="flex items-start gap-3">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">1</span>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ t('checkout.securePayment') }}</h1>
              <p class="mt-1 text-sm text-gray-600">{{ t('checkout.paymentHelp') }}</p>
            </div>
          </div>

          <FormKit
              type="form"
              :submit-label="t('checkout.paySecurely')"
              :actions="false"
              :validation-rules="{ cardNumber: isValidCardNumber, expiryDate: isValidExpiryDate, cvv: isValidCvv }"
              @submit="submitPayment"
          >
            <div class="mt-7">
              <FormKit
                  v-model.trim="formData.cardholder"
                  type="text"
                  name="cardholder"
                  :label="t('checkout.cardholder')"
                  validation="required"
                  :disabled="cart.processingPayment"
                  :validation-messages="{ required: t('checkout.cardholderRequired') }"
              />
              <FormKit
                  v-model="cardNumber"
                  type="tel"
                  name="cardNumber"
                  :label="t('checkout.cardNumber')"
                  placeholder="4242 4242 4242 4242"
                  inputmode="numeric"
                  validation="required|cardNumber"
                  :disabled="cart.processingPayment"
                  :validation-messages="{ required: t('checkout.cardNumberRequired'), cardNumber: t('checkout.cardNumberInvalid') }"
              />
              <div class="grid gap-5 sm:grid-cols-2">
                <FormKit
                    v-model="expiryDate"
                    type="tel"
                    name="expiryDate"
                    :label="t('checkout.expiryDate')"
                    placeholder="MM/YY"
                    inputmode="numeric"
                    validation="required|expiryDate"
                    :disabled="cart.processingPayment"
                    :validation-messages="{ required: t('checkout.expiryRequired'), expiryDate: t('checkout.expiryInvalid') }"
                />
                <FormKit
                    v-model="formData.cvv"
                    type="password"
                    name="cvv"
                    :label="t('checkout.cvv')"
                    placeholder="123"
                    inputmode="numeric"
                    validation="required|cvv"
                    :disabled="cart.processingPayment"
                    :validation-messages="{ required: t('checkout.cvvRequired'), cvv: t('checkout.cvvInvalid') }"
                />
              </div>
            </div>
            <div class="mt-6">
              <Voucher />
            </div>
            <p v-if="paymentError" class="mb-4 mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">{{ paymentError }}</p>
            <button
                type="submit"
                class="mt-6 flex w-full items-center justify-center rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 disabled:bg-gray-300"
                :disabled="cart.processingPayment || coupon.applyingDiscount"
                            >
                              <span v-if="cart.processingPayment">>{{ t('checkout.processing') }}</span>
              <span v-else>{{ t('checkout.pay', { total: formatCurrency(cart.total) }) }}</span>
            </button>
          </FormKit>
          <p class="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
            <LockClosedIcon class="h-4 w-4" />
            {{ t('checkout.demoNotice') }}
          </p>
        </section>

        <aside class="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-bold text-gray-900">{{ t('cart.orderSummary') }}</h2>
          <ul class="mt-5 divide-y divide-gray-200">
            <li v-for="item in cart.items" :key="item.id" class="flex gap-3 py-4 first:pt-0">
              <img :src="item.image" :alt="item.name" class="h-14 w-14 rounded-md object-cover" />
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium text-gray-900">{{ item.name }}</p>
                <p class="mt-1 text-sm text-gray-500">{{ t('common.quantity') }} {{ item.quantity }}</p>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ formatCurrency(item.price * item.quantity) }}</p>
            </li>
          </ul>
          <dl class="mt-5 space-y-3 border-t border-gray-200 pt-5 text-sm">
            <div class="flex justify-between text-gray-600"><dt>{{ t('common.subtotal') }}</dt><dd>{{ formatCurrency(cart.subtotal) }}</dd></div>
            <div v-if="coupon.discount > 0" class="flex justify-between text-teal-700"><dt>{{ t('common.savings') }}</dt><dd>-{{ formatCurrency(coupon.discount) }}</dd></div>
            <div class="flex justify-between text-gray-600"><dt>{{ t('common.taxes') }}</dt><dd>{{ formatCurrency(cart.taxes) }}</dd></div>
            <div class="flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-gray-900"><dt>{{ t('common.total') }}</dt><dd>{{ formatCurrency(cart.total) }}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  </main>
</template>
