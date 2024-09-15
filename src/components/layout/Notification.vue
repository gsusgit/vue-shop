<script setup>
defineProps({
  notification: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div id="alert-additional-content-3" class="p-4 mb-4 text-teal-800 border border-gray-300 rounded-lg bg-white" role="alert">
    <div class="flex items-center">
      <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span class="sr-only">Info</span>
      <h3 class="text-lg font-medium">{{notification.title}}</h3>
    </div>
    <div class="mt-2 mb-4 text-sm">
      {{notification.message}}
    </div>
    <div class="flex">
      <RouterLink :to="{name: 'new-product'}">
        <button type="button" class="text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
          {{notification.button}}
        </button>
      </RouterLink>
    </div>
  </div>
</template>
