<script setup>

</script>

<template>
  <div class="col-span-1 mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <p class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg> <span class="text-xl font-semibold text-gray-900 ml-1"> Order summary</span>
      </p>
      <div class="space-y-4">
        <div class="space-y-2">
          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-500">Cart amount</dt>
            <dd class="text-base font-medium text-gray-900e">$0.00</dd>
          </dl>
          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-500">Savings</dt>
            <dd class="text-base font-medium text-teal-600">-$0.00</dd>
          </dl>
          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-500">Tax</dt>
            <dd class="text-base font-medium text-gray-900e">$0</dd>
          </dl>
        </div>
        <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
          <dt class="text-base font-bold text-gray-900e">Total</dt>
          <dd class="text-base font-bold text-gray-900e">$0.00</dd>
        </dl>
      </div>
      <a href="#" class="flex w-full items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
        </svg>
        <span class="ml-1">Proceed to Checkout</span>
      </a>
    </div>
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <form class="space-y-4">
        <div>
          <label for="voucher" class="mb-2 block text-sm font-medium text-gray-900e"> Do you have a discount code? </label>
          <input type="text" id="voucher" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500" placeholder="" required />
        </div>
        <button type="submit" class="flex w-full items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300">Apply Code</button>
      </form>
    </div>
  </div>
</template>
