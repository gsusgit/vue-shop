<script setup>
import { useCouponStore } from '@/stores/voucher.js'

const voucher = useCouponStore()
</script>

<template>
  <div class="flex lg:space-x-4">
    <div class="flex-1 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div>
        <p class="flex items-center">
          <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g id="Voucher"><path clip-rule="evenodd" d="M0.25 7C0.25 6.0335 1.0335 5.25 2 5.25H22C22.9665 5.25 23.75 6.0335 23.75 7V9C23.75 9.41421 23.4142 9.75 23 9.75C22.5858 9.75 22.25 9.41421 22.25 9V7C22.25 6.86193 22.1381 6.75 22 6.75H2C1.86193 6.75 1.75 6.86193 1.75 7V9C1.75 9.41421 1.41421 9.75 1 9.75C0.585786 9.75 0.25 9.41421 0.25 9V7ZM1 15.25C1.41421 15.25 1.75 15.5858 1.75 16V18C1.75 18.1381 1.86193 18.25 2 18.25H22C22.1381 18.25 22.25 18.1381 22.25 18V16C22.25 15.5858 22.5858 15.25 23 15.25C23.4142 15.25 23.75 15.5858 23.75 16V18C23.75 18.9665 22.9665 19.75 22 19.75H2C1.0335 19.75 0.25 18.9665 0.25 18V16C0.25 15.5858 0.585786 15.25 1 15.25Z" fill="black" fill-rule="evenodd" id="Rectangle 23 (Stroke)"/><path clip-rule="evenodd" d="M22.5 9.75C20.9812 9.75 19.75 10.9812 19.75 12.5C19.75 14.0188 20.9812 15.25 22.5 15.25C22.9142 15.25 23.25 15.5858 23.25 16C23.25 16.4142 22.9142 16.75 22.5 16.75C20.1528 16.75 18.25 14.8472 18.25 12.5C18.25 10.1528 20.1528 8.25 22.5 8.25C22.9142 8.25 23.25 8.58579 23.25 9C23.25 9.41421 22.9142 9.75 22.5 9.75Z" fill="black" fill-rule="evenodd" id="Ellipse 10 (Stroke)"/><path clip-rule="evenodd" d="M0.25 9C0.25 8.58579 0.585786 8.25 1 8.25C3.34721 8.25 5.25 10.1528 5.25 12.5C5.25 14.8472 3.34721 16.75 1 16.75C0.585786 16.75 0.25 16.4142 0.25 16C0.25 15.5858 0.585786 15.25 1 15.25C2.51878 15.25 3.75 14.0188 3.75 12.5C3.75 10.9812 2.51878 9.75 1 9.75C0.585786 9.75 0.25 9.41421 0.25 9Z" fill="black" fill-rule="evenodd" id="Ellipse 11 (Stroke)"/><path clip-rule="evenodd" d="M9 17.25C9.41421 17.25 9.75 17.5858 9.75 18V19C9.75 19.4142 9.41421 19.75 9 19.75C8.58579 19.75 8.25 19.4142 8.25 19V18C8.25 17.5858 8.58579 17.25 9 17.25Z" fill="black" fill-rule="evenodd" id="Vector 28 (Stroke)"/><path clip-rule="evenodd" d="M9 13.25C9.41421 13.25 9.75 13.5858 9.75 14V15C9.75 15.4142 9.41421 15.75 9 15.75C8.58579 15.75 8.25 15.4142 8.25 15V14C8.25 13.5858 8.58579 13.25 9 13.25Z" fill="black" fill-rule="evenodd" id="Vector 29 (Stroke)"/><path clip-rule="evenodd" d="M9 9.25C9.41421 9.25 9.75 9.58579 9.75 10V11C9.75 11.4142 9.41421 11.75 9 11.75C8.58579 11.75 8.25 11.4142 8.25 11V10C8.25 9.58579 8.58579 9.25 9 9.25Z" fill="black" fill-rule="evenodd" id="Vector 30 (Stroke)"/><path clip-rule="evenodd" d="M9 5.25C9.41421 5.25 9.75 5.58579 9.75 6V7C9.75 7.41421 9.41421 7.75 9 7.75C8.58579 7.75 8.25 7.41421 8.25 7V6C8.25 5.58579 8.58579 5.25 9 5.25Z" fill="black" fill-rule="evenodd" id="Vector 31 (Stroke)"/></g></svg>
          <span class="text-xl font-semibold text-gray-900 ml-1">Vouchers</span>
        </p>
        <div>
          <div class="mt-6 divide-y divide-gray-200 border-t border-gray-200"></div>
          <div class="mt-5">
            <form
                v-if="!voucher.isValidCoupon"
                class="space-y-4"
                @submit.prevent
            >
              <div>
                <label for="voucher" class="mb-2 block text-sm font-medium text-gray-900">Do you have a discount code?</label>
                <div class="relative">
                  <input
                      type="text"
                      class="block w-full p-4 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:bg-gray-50 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter code..."
                      required
                      v-model="voucher.couponInput"
                  />
                  <button
                      v-if="voucher.applyingDiscount"
                      disabled type="button" class="text-gray-500 bg-gray-100 font-medium rounded-lg text-sm px-4 inline-flex items-center absolute end-2.5 bottom-2.5 py-2">
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    Validating...
                  </button>
                  <button
                      v-else
                      type="submit"
                      class="text-white absolute end-2.5 bottom-2.5 bg-teal-700 disabled:bg-gray-100 disabled:text-gray-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2"
                      :disabled="voucher.couponInput === ''"
                      @click="voucher.applyCoupon"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </form>
            <p v-if="voucher.showError" class="text-red-800 mt-3 font-semibold text-sm">{{voucher.discountDescription}}</p>
            <div v-if="voucher.isValidCoupon" class="container mx-auto">
              <div class="bg-gray-800 text-white py-5 px-5 rounded-lg shadow-md relative">
                <h3 class="text-lg"><span class="font-bold border-2 border-white rounded-md border-dashed px-3 py-1 mx-2">{{voucher.couponInput}}</span> {{voucher.discountDescription}}</h3>
                <div class="rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 mr-3">
                  <button
                      type="button"
                      class="ml-auto ms-auto text-white -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8"
                      @click="voucher.$reset"
                  >
                    <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                      <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
