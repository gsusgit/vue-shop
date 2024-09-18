<script setup>
import PageTitle from '@/components/layout/base/PageTitle.vue'
import { onMounted, ref } from 'vue'
import Spinner from '@/components/layout/shared/Spinner.vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<template>
  <div v-if="loading">
    <Spinner />
  </div>
  <div v-else>
    <PageTitle title="Sales"  parentTitle="Admin"/>
  </div>
</template>
