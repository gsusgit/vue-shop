<script setup>
import { FormKit } from '@formkit/vue'
import PageTitle from '@/components/layout/PageTitle.vue'
</script>

<template>
  <PageTitle title="New Product"  parentTitle="Products"/>
  <div class="mt-10">
    <FormKit></FormKit>
  </div>
</template>
