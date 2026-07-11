<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/layout/base/NavBar.vue'
import Footer from '@/components/layout/base/Footer.vue'
import Toast from '@/components/layout/shared/Toast.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Hero from '@/components/layout/shared/Hero.vue'

const route = useRoute()

const isAdminRoute = computed(() => route.path.startsWith('/backoffice'))

const isHome = computed(() => route.path === '/')

const isFullScreen = computed(() => route.meta.fullScreen)

</script>

<template>
  <RouterView v-if="isFullScreen" />
  <div v-else class="flex flex-col min-h-screen">
    <NavBar />
    <Hero v-if="isHome"/>
    <main
        :class="{'bg-white': !isAdminRoute}"
        class="flex-grow"
    >
      <div :class="isHome ? 'mb-20 mt-12 lg:mt-0' : 'my-20'" class="max-w-screen-xl mx-auto p-4">
        <Toast />
        <RouterView />
      </div>
    </main>
    <Footer />
  </div>
</template>
