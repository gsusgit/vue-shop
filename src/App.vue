<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import PreLoader from '@/components/layout/PreLoader.vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1500)
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <main class="flex-grow">
      <div class="max-w-screen-xl mx-auto p-4 my-20">
        <PreLoader v-if="loading" />
        <RouterView v-else />
      </div>
    </main>
    <Footer />
  </div>
</template>



