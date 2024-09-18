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
            :is="type === 'button' || type === 'icon' ? 'button' : 'a'"
            :class="[
              type === 'button'
                ? 'text-white bg-neutral-800 hover:bg-neutral-600 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-4 py-2 text-center'
                : type === 'icon'
                  ? 'inline-flex items-center justify-center px-2.5 text-gray-800 hover:text-teal-700'
                  : [
                      'block py-2 px-3 mr-5 text-gray-800 md:p-0',
                      isActive ? 'text-teal-700' : 'hover:text-teal-700'
                    ]
            ]"
            :href="type !== 'button' && type !== 'icon' ? '#' : undefined"
            :type="type === 'button' ? 'button' : undefined"
            :aria-current="isActive ? 'page' : undefined"
        >
          <slot></slot>
        </component>
      </template>
    </RouterLink>
  </li>
</template>
