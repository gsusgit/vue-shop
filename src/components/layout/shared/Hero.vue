<script setup>
import useToast from '@/composables/useToast.js'
import { useI18n } from 'vue-i18n'

const { show } = useToast()
const { t } = useI18n()

const copyCoupon = () => {
  navigator.clipboard.writeText("10SALE")
      .then(() => {
        show(t('shop.couponCopied'), 'success')
      })
      .catch(error => {
        console.log(error)
      });
}
</script>

<template>
  <section id="hero" class="-mb-px bg-neutral-900 pb-8 pt-24">
    <div class="mx-auto grid max-w-screen-xl px-4 py-8 min-[691px]:grid-cols-[minmax(0,1.05fr)_minmax(13rem,0.95fr)] min-[691px]:items-center min-[691px]:gap-6 min-[691px]:py-12 lg:gap-8 lg:py-16">
      <div class="mx-auto max-w-2xl place-self-center text-center min-[691px]:mx-0 min-[691px]:text-left">
        <h1 class="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-white min-[691px]:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          <span class="text-teal-600">{{ t('shop.freshPicksPrimary') }}</span> {{ t('shop.freshPicksSuffix') }}
        </h1>
        <p class="mb-6 max-w-2xl text-gray-400 min-[691px]:text-base md:text-lg lg:mb-8 lg:text-xl">{{ t('shop.heroDescription') }}</p>
        <RouterLink :to="{name: 'product', params: {id: '5vm2UbWX8pFziDMuDZzh'}}">
          <a class="bg-white inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center border rounded-3xl text-black border-gray-700 hover:bg-teal-700 hover:text-white focus:ring-gray-800">
            Jordan 1 Chicago Off White
          </a>
        </RouterLink>
        <div class="mt-10 flex max-w-2xl flex-col items-center gap-4 min-[691px]:flex-row min-[691px]:items-center">
          <span class="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 min-[691px]:text-sm md:text-base">
            {{ t('shop.couponOffer') }}
          </span>
          <span
              class="inline-flex cursor-pointer items-center justify-center rounded-md border-2 border-dashed px-3 py-1 text-center text-2xl font-bold text-white hover:bg-neutral-700"
              @click="copyCoupon"
          >
            10SALE
          </span>
        </div>
      </div>
      <div class="hidden min-[691px]:flex min-[691px]:items-center min-[691px]:justify-center">
        <img
            src="@/assets/images/carousel/jordan1-chicago-off-white.png"
            :alt="t('shop.productImageAlt')"
            class="max-h-64 w-auto object-contain md:max-h-80 lg:max-h-[26rem]"
        >
      </div>
    </div>
    <div class="custom-shape-divider-bottom-1726786931">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
      </svg>
    </div>
  </section>
</template>

<style scoped>
  #hero {
    position: relative;
    background-color: #171717;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1146' height='137.5' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23212121' stroke-width='1.9' %3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E");
  }

  .custom-shape-divider-bottom-1726786931 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .custom-shape-divider-bottom-1726786931 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 42px;
  }

  .custom-shape-divider-bottom-1726786931 .shape-fill {
    fill: #FFFFFF;
  }
</style>
