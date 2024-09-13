<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: {
    type: String,
    required: true
  },
  parentTitle: {
    type: String,
    required: true
  }
})
</script>

<template>
    <h1 class="mb-4 text-xl font-semibold leading-none tracking-tight text-gray-900">{{title}}</h1>
    <nav class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li v-if="parentTitle === 'Admin'" class="inline-flex items-center">
          <span class="inline-flex items-center text-sm font-medium text-gray-700">
            {{ parentTitle }}
          </span>
        </li>
        <li v-if="parentTitle !== 'Admin'" class="inline-flex items-center">
          <span class="inline-flex items-center text-sm font-medium text-gray-700">
            Admin
          </span>
        </li>
        <li v-if="parentTitle !== 'Admin'">
          <div class="flex items-center">
            <RouterLink :to="{name: parentTitle.toLowerCase()}" class="inline-flex items-center text-sm font-medium cursor-pointer">
              <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span class="ms-1 text-sm font-medium text-gray-700 hover:text-teal-600">{{parentTitle}}</span>
            </RouterLink>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="ms-1 text-sm font-medium text-gray-700">{{title}}</span>
          </div>
        </li>
      </ol>
    </nav>
</template>
