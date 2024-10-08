<script setup>

import { ref, reactive, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { FormKit } from '@formkit/vue'
  import useImage from '@/composables/useImage.js'
  import { useProductsStore } from '@/stores/products.js'
  import useToast from '@/composables/useToast.js'
  import { CameraIcon } from '@heroicons/vue/24/outline'
  import PageTitle from '@/components/layout/base/PageTitle.vue'
  import { uid } from 'uid'
  import Spinner from '@/components/layout/shared/Spinner.vue'

  const loading = ref(true)

  onMounted(() => {
    setTimeout(() => {
      loading.value = false
    }, 1000)
  })

  const {
    onFileChange,
    imageUrl,
    imageUploaded,
    isUploading
  } = useImage()

  const { show } = useToast()

  const products = useProductsStore()
  const fileInputRef = ref(null)
  const formData = reactive({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
  })
  const router = useRouter()

  const handleImageClick = () => {
    if (fileInputRef.value) {
      fileInputRef.value.click()
    }
  }

  const submitHandler = async data => {
    try {
      await products.createProduct({
            ...data,
            image: imageUrl.value,
            id: uid(),
          })
      triggerToast()
    } catch (error) {
      console.log(error)
    }
  }

  const triggerToast = () => {
    show('New product added', 'success')
    router.push({name: 'products'})
  }

</script>

<template>
  <div v-if="loading">
    <Spinner />
  </div>
  <div v-else>
    <PageTitle title="New Product" parentTitle="Products"/>
    <div class="mt-10 p-5 border border-gray-200 rounded-lg bg-white">
      <FormKit
          type="form"
          submit-label="Add Product"
          @submit="submitHandler"
          :value="formData"
      >
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2">
            <FormKit
                type="text"
                label="Name"
                name="name"
                placeholder="Product name"
                validation="required"
                :validation-messages="{ required: 'Name is required' }"
                v-model.trim="formData.name"
            />

            <FormKit
                type="textarea"
                label="Description"
                name="description"
                placeholder="Product description"
                validation="required"
                :validation-messages="{ required: 'Description is required' }"
                rows="12"
                v-model.trim="formData.description"
            />

            <div class="grid grid-cols-3 gap-4 mt-4">
              <FormKit
                  type="select"
                  label="Category"
                  name="category"
                  placeholder="Category"
                  validation="required"
                  :validation-messages="{ required: 'Category is required' }"
                  :options="products.categoryOptions"
                  v-model.trim="formData.category"
              />

              <FormKit
                  type="number"
                  label="Price"
                  name="price"
                  placeholder="Product price"
                  validation="required"
                  :validation-messages="{ required: 'Price is required' }"
                  min="0.01"
                  step="0.01"
                  v-model.number="formData.price"
              />

              <FormKit
                  type="number"
                  label="Stock"
                  name="stock"
                  placeholder="Product units"
                  validation="required"
                  :validation-messages="{ required: 'Stock is required' }"
                  min="0"
                  v-model.number="formData.stock"
              />
            </div>
          </div>

          <div class="col-span-1">
            <label class="formkit-label block font-bold text-gray-700 mb-2 text-sm">Image</label>
            <div v-if="isUploading && !imageUploaded" class="relative w-full aspect-w-1 aspect-h-1 rounded-xl shadow-sm border border-gray-200" style="height: 390px;" role="group" aria-label="Uploading">
              <div class="absolute inset-0 flex items-center justify-center rounded-2xl">
                <div class="flex flex-col items-center justify-center">
                  <div class="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-teal-600"></div>
                  <span class="mt-2 text-gray-500">Loading image...</span>
                </div>
              </div>
            </div>

            <div v-if="!isUploading" class="relative w-full aspect-w-1 aspect-h-1 rounded-xl shadow-sm border border-gray-200 bg-gray-50" style="height: 395px">
              <img v-if="imageUploaded"
                   :src="imageUrl"
                   alt="Product Image"
                   class="cursor-pointer object-cover w-full h-full rounded-2xl"
                   @click="handleImageClick"
              />
              <div v-if="!imageUploaded && !isUploading" class="flex items-center justify-center w-full h-full">
                <CameraIcon class="w-12 h-12 text-gray-500 cursor-pointer" @click="handleImageClick"/>
              </div>
              <input
                  type="file"
                  name="image"
                  ref="fileInputRef"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".jpg"
                  @change="onFileChange($event)"
              />
            </div>
          </div>
        </div>
      </FormKit>
    </div>
  </div>
</template>
