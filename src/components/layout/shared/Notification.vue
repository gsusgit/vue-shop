<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isAdminRoute = computed(() => route.path.startsWith('/backoffice'))

defineProps({
  notification: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div
      :class="[isAdminRoute ? 'bg-white' : 'bg-gray-100']"
      class="p-4 mb-4 text-teal-800 rounded-lg" role="alert"
  >
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
      <RouterLink :to="{name: notification.button1.route}">
        <button type="button" class="text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center">
          {{notification.button1.text}}
        </button>
        <RouterLink :to="{name: notification.button2.route}">
          <button v-if="notification.button2.text" type="button" class="text-white bg-neutral-800 hover:bg-neutral-900 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-cente">
            {{notification.button2.text}}
          </button>
        </RouterLink>
      </RouterLink>
    </div>
  </div>
</template>
