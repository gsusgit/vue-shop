<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/layout/base/NavBar.vue'
import Footer from '@/components/layout/base/Footer.vue'
import Toast from '@/components/layout/shared/Toast.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isAdminRoute = computed(() => route.path.startsWith('/backoffice'))
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <main
        :class="{'bg-white': !isAdminRoute}"
        class="flex-grow"
    >
      <div class="max-w-screen-xl mx-auto p-4 my-20">
        <Toast />
        <RouterView />
      </div>
    </main>
    <Footer />
  </div>
</template>



