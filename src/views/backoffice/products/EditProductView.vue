<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { FormKit } from '@formkit/vue'
import useImage from '@/composables/useImage.js'
import { useProductsStore } from '@/stores/products.js'
import useToast from '@/composables/useToast.js'
import { CameraIcon } from '@heroicons/vue/24/outline'
import PageTitle from '@/components/layout/base/PageTitle.vue'
import Spinner from '@/components/layout/shared/Spinner.vue'

const loading = ref(true)

const {
  onFileChange,
  imageUrl,
  imageUploaded,
  isUploading
} = useImage()

const store = useProductsStore()
const products = useProductsStore()
const { show } = useToast()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const fileInputRef = ref(null)
const formData = reactive({
  name: '',
  description: '',
  category: '',
  price: '',
  stock: '',
})

async function loadProduct(id) {
  loading.value = true
  const data = await store.getProduct(id)
  if (data) {
    Object.assign(formData, data)
    imageUrl.value = data.image ?? ''
  } else {
    router.push({ name: 'products' })
    return
  }
  loading.value = false
}

onMounted(() => {
  loadProduct(route.params.id)
})

watch(() => route.params.id, (id) => {
  if (id) loadProduct(id)
})

const handleImageClick = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const submitHandler = async (data) => {
  const product = {
    ...data,
    image: imageUrl.value
  }
  await store.updateProduct(route.params.id, product)
  triggerToast()
}

const triggerToast = () => {
  show(t('products.updated'), 'success')
  router.push({ name: 'products' })
}
</script>

<template>
  <div v-if="loading">
    <Spinner />
  </div>
  <div v-else>
    <PageTitle
        :title="t('products.editProduct')"
                :parent-title="t('navigation.products')"
                parent-route="products" />
    <div
        class="mt-10 p-5 border border-gray-200 rounded-lg bg-white">
      <FormKit
          type="form"
          :submit-label="t('products.updateProduct')"
          @submit="submitHandler"
          :value="formData"
      >
        <div
            class="grid gap-6 lg:grid-cols-3">
          <div
              class="lg:col-span-2">
            <FormKit
                type="text"
                :label="t('common.name')"
                                name="name"
                                :placeholder="t('products.productName')"
                                validation="required"
                                :validation-messages="{ required: t('products.nameRequired') }"
                v-model.trim="formData.name"
            />

            <FormKit
                type="textarea"
                :label="t('common.description')"
                                name="description"
                                :placeholder="t('products.productDescription')"
                                validation="required"
                                :validation-messages="{ required: t('products.descriptionRequired') }"
                rows="12"
                v-model.trim="formData.description"
            />

            <div
                class="mt-4 grid gap-4 sm:grid-cols-3">
              <FormKit
                  type="select"
                  :label="t('common.category')"
                                    name="category"
                                    :placeholder="t('common.selectCategory')"
                                    validation="required"
                                    :validation-messages="{ required: t('products.categoryRequired') }"
                  :options="products.categoryOptions"
                  v-model.trim="formData.category"
              />

              <FormKit
                  type="number"
                  :label="t('common.price')"
                                    name="price"
                                    :placeholder="t('products.productPrice')"
                                    validation="required"
                                    :validation-messages="{ required: t('products.priceRequired') }"
                  min="0"
                  step="0.01"
                  v-model.number="formData.price"
              />

              <FormKit
                  type="number"
                  :label="t('common.stock')"
                                    name="stock"
                                    :placeholder="t('products.productUnits')"
                                    validation="required"
                                    :validation-messages="{ required: t('products.stockRequired') }"
                  min="0"
                  v-model.number="formData.stock"
              />
            </div>
          </div>

          <div
              class="lg:col-span-1">
            <label
                class="formkit-label block font-bold text-gray-700 mb-2 text-sm">{{ t('common.image') }}</label>
            <div
                v-if="isUploading && !imageUploaded"
                class="relative aspect-square w-full rounded-xl border border-gray-200 shadow-sm"

                role="group"
                :aria-label="t('common.uploading')">
                              <div
                  class="absolute inset-0 flex items-center justify-center rounded-2xl">
                <div
                    class="flex flex-col items-center justify-center">
                  <div
                      class="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-teal-600"></div>
                  <span
                      class="mt-2 text-gray-500">{{ t('common.loadingImage') }}</span>
                </div>
              </div>
            </div>

            <div
                v-if="!isUploading"
                class="relative aspect-square w-full rounded-xl border border-gray-200 shadow-sm bg-gray-50"
               >
              <img
                  v-if="imageUploaded"
                  :src="imageUrl"
                  :alt="t('common.productImage')"
                  class="cursor-pointer object-cover w-full h-full rounded-2xl"
                  @click="handleImageClick"
              />
              <div
                  v-if="!imageUploaded && !isUploading"
                  class="flex items-center justify-center w-full h-full">
                <CameraIcon
                    class="w-12 h-12 text-gray-500 cursor-pointer"
                    @click="handleImageClick"/>
              </div>
              <input
                  type="file"
                  name="image"
                  ref="fileInputRef"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".jpg,.jpeg,.png,.webp"
                                    :aria-label="t('common.productImage')"
                                    @change="onFileChange($event)"
              />
            </div>
          </div>
        </div>
      </FormKit>
    </div>
  </div>
</template>
