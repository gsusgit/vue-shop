<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useCart } from '@/stores/cart.js'
import { useCouponStore } from '@/stores/voucher.js'
import { formatCurrency } from '@/lib/helpers.js'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])
const router = useRouter()
const { t } = useI18n()
const cart = useCart()
const coupon = useCouponStore()
const itemCount = computed(() => cart.items.reduce((total, item) => total + item.quantity, 0))

const close = () => emit('close')

const goToCart = () => {
  close()
  router.push({ name: 'cart' })
}

const handleKeydown = event => {
  if (props.show && event.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4"
      role="presentation"
      @click.self="close"
  >
    <section
        class="relative w-full max-w-xl rounded-lg bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-summary-title"
    >
      <button
          type="button"
          class="absolute right-3 top-3 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-300"
          :aria-label="t('common.close')"
          @click="close"
      >
        <XMarkIcon class="h-5 w-5" />
      </button>
      <div class="pr-8">
        <p class="text-sm font-medium text-teal-700">{{ t('shop.addedToCart') }}</p>
                <h2 id="cart-summary-title" class="mt-1 text-xl font-bold text-gray-900">{{ t('shop.cartReady') }}</h2>
      </div>
      <ul class="mt-5 max-h-64 divide-y divide-gray-200 overflow-y-auto rounded-lg border border-gray-200 px-3">
        <li v-for="item in cart.items" :key="item.id" class="flex items-center gap-3 py-3">
          <img :src="item.image" :alt="item.name" class="h-14 w-14 rounded-md object-cover" />
          <div class="min-w-0 flex-1">
            <p class="truncate font-medium text-gray-900">{{ item.name }}</p>
            <p class="mt-1 text-sm text-gray-500">{{ t('common.quantity') }} {{ item.quantity }}</p>
          </div>
          <p class="text-sm font-medium text-gray-900">{{ formatCurrency(item.price * item.quantity) }}</p>
        </li>
      </ul>
      <div class="mt-5 space-y-2 text-sm">
        <div class="flex justify-between text-gray-600">
          <span>{{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }}</span>
          <span>{{ formatCurrency(cart.subtotal) }}</span>
        </div>
        <div v-if="coupon.discount > 0" class="flex justify-between text-teal-700">
          <span>{{ t('common.savings') }}</span>
          <span>-{{ formatCurrency(coupon.discount) }}</span>
        </div>
        <div class="flex justify-between border-t border-gray-200 pt-2 text-base font-bold text-gray-900">
          <span>{{ t('common.total') }}</span>
          <span>{{ formatCurrency(cart.total) }}</span>
        </div>
      </div>
      <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
            type="button"
            class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
            @click="close"
        >
          {{ t('common.continueShopping') }}
        </button>
        <button
            type="button"
            class="rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300"
            @click="goToCart"
        >
          {{ t('common.checkout') }}
        </button>
      </div>
    </section>
  </div>
</template>
