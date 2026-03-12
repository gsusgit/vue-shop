<script setup>
import useToast from '@/composables/useToast.js'

const {
    showToast,
    message,
    color
} = useToast()

</script>

<template>
  <transition
      name="fade">
    <div
        v-if="showToast"
        :class="[color === 'success' ? 'bg-teal-50 shadow-teal-50 border-teal-100' : 'bg-red-50 shadow-red-50 border-red-100']"
        class="toast fixed top-24 right-4 w-auto max-w-xs p-4 text-sm font-bold rounded-lg shadow-sm border-2"
        role="alert">
      <span
          :class="[color === 'success' ? 'text-teal-700' : 'text-red-900']"
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
