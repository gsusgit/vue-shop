<script setup>

  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { FormKit } from '@formkit/vue'
  import useImage from '@/composables/useImage.js'
  import { useProductsStore } from '@/stores/products.js'
  import { CameraIcon } from '@heroicons/vue/24/outline'
  import PageTitle from '@/components/layout/PageTitle.vue'

  const {
    onFileChange,
    imageUrl,
    imageUploaded,
    isUploading
  } = useImage()

  const products = useProductsStore()
  const fileInputRef = ref(null)
  const formData = reactive({
    name: 'Black and Orange Hoodie',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    category: '2',
    price: '49',
    stock: '3',
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
            image: imageUrl.value
          })
          router.push({name: 'products'})
    } catch (error) {
      console.log(error)
    }
  }

</script>

<template>
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
                min="1"
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
</template>
