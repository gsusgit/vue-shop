<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  title: {
    type: String,
    required: true
  },
  parentTitle: {
    type: String,
    required: true
  },
  parentRoute: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <h1 class="mb-4 text-xl font-semibold leading-none tracking-tight text-gray-900">{{ title }}</h1>
  <nav class="flex text-gray-700 py-3" :aria-label="t('common.breadcrumb')">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li v-if="parentTitle === t('navigation.admin')" class="inline-flex items-center">
        <span class="inline-flex items-center text-sm font-regular text-gray-700">{{ parentTitle }}</span>
      </li>
      <li v-else class="inline-flex items-center">
        <span class="inline-flex items-center text-sm font-regular text-gray-700">{{ t('navigation.admin') }}</span>
      </li>
      <li v-if="parentRoute">
        <div class="flex items-center">
          <RouterLink :to="{ name: parentRoute }" class="inline-flex items-center text-sm font-regular cursor-pointer">
            <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="ms-1 text-sm font-regular text-gray-700 hover:text-teal-600">{{ parentTitle }}</span>
          </RouterLink>
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span class="ms-1 text-sm font-semibold text-gray-700">{{ title }}</span>
        </div>
      </li>
    </ol>
  </nav>
</template>
