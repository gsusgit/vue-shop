<script setup>
import { FormKit } from '@formkit/vue'
import useImage from '@/composables/useImage.js'
import PageTitle from '@/components/layout/PageTitle.vue'

const {
  onFileChange,
  imageUrl,
  imageUploaded,
  isUploading
} = useImage()
</script>

<template>
  <PageTitle title="New Product" parentTitle="Products" />
  <div class="mt-10 p-5 border border-gray-200 rounded-lg bg-white">
    <FormKit type="form">
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2">
          <FormKit
              type="text"
              label="Name"
              name="name"
              placeholder="Product name"
              validation="required"
              :validation-messages="{ required: 'Name is required' }"
          />

          <FormKit
              type="textarea"
              label="Description"
              name="description"
              placeholder="Product description"
              validation="required"
              :validation-messages="{ required: 'Description is required' }"
              rows="10"
          />

          <div class="grid grid-cols-3 gap-4 mt-4">
            <FormKit
                type="select"
                label="Category"
                name="category"
                placeholder="Category"
                validation="required"
                :validation-messages="{ required: 'Category is required' }"
                :options="[1, 2, 3]"
            />

            <FormKit
                type="number"
                label="Price"
                name="price"
                placeholder="Product price"
                validation="required"
                :validation-messages="{ required: 'Price is required' }"
                min="1"
            />

            <FormKit
                type="number"
                label="Stock"
                name="stock"
                placeholder="Stock available"
                validation="required"
                :validation-messages="{ required: 'Stock is required' }"
                min="0"
            />
          </div>
        </div>

        <div class="col-span-1">
          <div v-if="isUploading && !imageUploaded" class="relative w-full aspect-w-1 aspect-h-1 rounded-xl shadow-sm border border-gray-200" style="height: 390px;" role="group" aria-label="Uploading">
            <div class="absolute inset-0 flex items-center justify-center rounded-2xl">
              <div class="flex flex-col items-center justify-center">
                <div class="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-teal-600"></div>
                <span class="mt-2 text-gray-500">Loading image...</span>
              </div>
            </div>
          </div>
          <div v-if="imageUploaded" class="mb-3">
            <label class="formkit-label block font-bold text-gray-700 mb-2 text-sm" for="input_6">Image</label>
            <div class="w-25 rounded-xl shadow-sm border border-gray-200" role="group" aria-label="Product Image">
              <div class="block">
                <img :src="imageUrl" alt="Product Image" class="max-lg:mx-auto rounded-2xl object-cover w-25">
              </div>
            </div>
          </div>

          <label v-if="!imageUploaded" class="formkit-label block font-bold text-gray-700 mb-2 text-sm" for="input_6">Image</label>
          <FormKit
              type="file"
              label=""
              name="image"
              validation="required"
              :validation-messages="{ required: 'Image is required' }"
              accept=".jpg"
              @change="onFileChange($event)"
          />
        </div>

      </div>
    </FormKit>
  </div>
</template>
