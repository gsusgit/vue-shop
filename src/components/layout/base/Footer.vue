<script setup>
const openGithub = () => {
  window.open('https://github.com/gsusgit/vue-shop', '_blank');
}
</script>

<template>
  <footer class="w-full bg-neutral-900 py-4 mt-auto">
    <div class="max-w-screen-xl mx-auto px-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-white sm:text-center">Vue + Pinia + Firebase + Tailwind + Formkit
    </span>
      <button type="button" class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
              @click="openGithub">
        <img src="../../../assets/icons/github.svg" class="h-4 mr-2" alt="Vue Logo" />
        Check on Github
      </button>
    </div>
  </footer>
</template>
