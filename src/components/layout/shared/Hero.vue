<script setup>
import useToast from '@/composables/useToast.js'

const { show } = useToast()

const copyCoupon = () => {
  navigator.clipboard.writeText("10SALE")
      .then(() => {
        show('Coupon copied to clipboard', 'success')
      })
      .catch(error => {
        console.log(error)
      });
}
</script>

<template>
  <section id="hero" class="mt-20 py-8 bg-neutral-900">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div class="mr-auto place-self-center lg:col-span-7">
        <h1 class="text-white max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
          <span class="text-teal-600">Fresh Picks</span> for You
        </h1>
        <p class="max-w-2xl mb-6 font-lightlg:mb-8 md:text-lg lg:text-xl text-gray-400">Hottest Trends in Urban Fashion, Handpicked. Your Next Favorite Look Starts Here!</p>
        <RouterLink :to="{name: 'product', params: {id: '5vm2UbWX8pFziDMuDZzh'}}">
          <a class="bg-white inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center border rounded-3xl text-black border-gray-700 hover:bg-teal-700 hover:text-white focus:ring-gray-800">
            Jordan 1 Chicago Off White
          </a>
        </RouterLink>
        <div class="mt-10 max-w-2xl">
          <span class="inline-flex items-center justify-center pr-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300">
            Use coupon for 10% OFF
            <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </span>
          <span
              class="inline-flex items-center justify-center font-bold text-center text-2xl text-white rounded-md border-2 border-dashed px-3 py-1 hover:bg-neutral-700 hover:cursor-pointer"
              @click="copyCoupon"
          >
            10SALE
          </span>
        </div>
      </div>
      <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img src="@/assets/images/carousel/jordan1-chicago-off-white.png" alt="mockup">
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
