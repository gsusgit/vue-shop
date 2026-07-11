<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const openGithub = () => {
  window.open('https://github.com/gsusgit/vue-shop', '_blank')
}
</script>

<template>
  <footer class="w-full bg-neutral-900 py-4 mt-auto">
    <div class="mx-auto flex max-w-screen-xl flex-col items-center gap-3 px-4 text-center md:flex-row md:justify-between md:text-left">
          <span class="text-sm text-white">Vue + Pinia + Tailwind + Formkit</span>
          <button type="button" class="inline-flex items-center rounded-lg bg-gray-100 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100" @click="openGithub">
        <img src="../../../assets/icons/github.svg" class="h-4 mr-2" :alt="t('common.viewOnGithub')" />
        {{ t('common.viewOnGithub') }}
      </button>
    </div>
  </footer>
</template>
