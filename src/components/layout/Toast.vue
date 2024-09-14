<script setup>
import useToast from '@/composables/useToast.js'

const {
    showToast,
    message,
    color,
    hide
} = useToast()

</script>

<template>
  <transition
      name="fade">
    <div
        v-if="showToast"
        :class="[color === 'success' ? 'bg-green-200' : 'bg-red-200']"
        class="toast fixed bottom-9 right-4 w-full max-w-xs p-4 text-gray-500 rounded-lg shadow"
        role="alert">
      <button
          type="button"
          :class="[color === 'success' ? 'text-green-950 hover:text-green-800' : 'text-red-950 hover:text-red-800']"
          class="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8"
          @click="hide"
          aria-label="Close">
        <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">
          <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
      <span
          class="ml-3"
          :class="[color === 'success' ? 'text-green-950' : 'text-red-950']"
      >
        {{message}}
      </span>
    </div>
  </transition>
</template>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */{
    opacity: 0;
  }
</style>
