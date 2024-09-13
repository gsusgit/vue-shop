<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  to: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li :class="['list-none list-inside', { 'py-1.5': type !== 'button' }]">
    <RouterLink :to="{ name: to }">
      <template #default="{ isActive }">
        <component
            :is="type === 'button' ? 'button' : 'a'"
            :class="[
            type === 'button'
              ? 'text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 text-center'
              : [
                'block py-2 px-3 mr-5 text-gray-800 md:p-0',
                isActive ? 'text-teal-700' : 'hover:text-teal-700'
              ]
          ]"
            :href="type !== 'button' ? '#' : undefined"
            :type="type === 'button' ? 'button' : undefined"
            :aria-current="isActive ? 'page' : undefined"
        >
          <slot></slot>
        </component>
      </template>
    </RouterLink>
  </li>
</template>
