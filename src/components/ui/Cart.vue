<script setup>

</script>

<template>
  <div class="col-span-1 mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <p class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

      <div class="space-y-4">
        <div class="space-y-2">
          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Cart amount</dt>
            <dd class="text-base font-medium text-gray-900 dark:text-white">$0.00</dd>
          </dl>

          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
            <dd class="text-base font-medium text-teal-600">-$0.00</dd>
          </dl>

          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
            <dd class="text-base font-medium text-gray-900 dark:text-white">$0</dd>
          </dl>
        </div>

        <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
          <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
          <dd class="text-base font-bold text-gray-900 dark:text-white">$0.00</dd>
        </dl>
      </div>

      <a href="#" class="flex w-full items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Proceed to Checkout</a>


    </div>

    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <form class="space-y-4">
        <div>
          <label for="voucher" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a discount code? </label>
          <input type="text" id="voucher" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500" placeholder="" required />
        </div>
        <button type="submit" class="flex w-full items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300">Apply Code</button>
      </form>
    </div>
  </div>
</template>
