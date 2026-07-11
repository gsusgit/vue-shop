<script
    setup
    xmlns="http://www.w3.org/1999/html">
import { formatCurrency } from '@/lib/helpers.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
<!--  hacer que el ultimo li no tenga border bottom-->
  <li class="py-4">
    <div class="flex gap-3 sm:items-center sm:justify-between">
      <div class="flex min-w-0 flex-1 items-center gap-3">
        <img :src="item.image" class="h-12 w-12 shrink-0 rounded-lg border border-gray-100 object-cover" :alt="item.name" />
        <div class="min-w-0">
          <p class="truncate text-sm font-semibold text-gray-900">{{ item.name }}</p>
          <p class="mt-1 text-xs text-gray-600">{{ t('common.quantity') }}: {{ item.quantity }} · {{ t('common.price') }}: {{ formatCurrency(item.price) }}</p>
        </div>
      </div>
      <p class="shrink-0 text-right text-sm">{{ t('common.total') }}: <span class="font-semibold">{{ formatCurrency(item.price * item.quantity) }}</span></p>
    </div>
  </li>
</template>
