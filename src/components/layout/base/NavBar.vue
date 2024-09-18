<script setup>
import Logo from '@/components/layout/base/Logo.vue'
import NavMenu from '@/components/layout/base/NavMenu.vue'

</script>

<template>
  <header>
    <nav class="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <NavMenu />
      </div>
    </nav>
  </header>
</template>
