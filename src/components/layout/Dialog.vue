<script setup>
const props = defineProps({
  modal: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['confirm-product-removal'])

const closeModal = () => {
  props.modal.show = false
}

const handleConfirm = () => {
  emits('confirm-product-removal')
  closeModal()
}
</script>

<template>
  <div
      id="modelConfirm"
      :class="modal.show ? '' : 'hidden'"
      @click.self="closeModal"
      class="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
    <div
        class="relative mx-auto shadow-xl rounded-md"
        :class="[modal.image ? 'top-20 max-w-3xl' : 'top-40 max-w-md']"
    >
      <div
          class="relative bg-white rounded-lg shadow">
        <button
            type="button"
            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200
            hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center
            items-center"
            @click="closeModal"
        >
          <svg
              class="w-3 h-3"
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
        <div
            class="p-4 md:p-5 text-center">
          <div
              v-if="modal.image">
            <img
                :src="modal.image"
                alt="Product image in full size"
                class="mx-auto mb-4 w-full rounded-lg"/>
          </div>
          <div
              v-else>
            <svg class="mx-auto mb-4 text-neutral-900 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            <h3 class="mb-5 text-lg font-normal text-neutral-900">
              {{
                modal.message
              }}</h3>
            <button
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4
              focus:outline-none focus:ring-red-300
              font-medium rounded-lg text-sm inline-flex items-center px-5
              py-2.5 text-center"
                @click="handleConfirm"
            >
              Yes,
              I'm
              sure
            </button>
            <button
                type="button"
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900
              focus:outline-none bg-white rounded-lg border border-gray-200
              hover:bg-gray-100 focus:z-10 focus:ring-4
              focus:ring-gray-100"
                @click="closeModal"
            >
              No,
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
