<script setup>
import { FormKit } from '@formkit/vue'
import PageTitle from '@/components/layout/PageTitle.vue'
</script>

<template>
  <PageTitle title="New Product"  parentTitle="Products"/>
  <div class="mt-10">
    <FormKit
        type="form"
        submit-label="Add product"
    >
      <FormKit
          type="text"
          label="Name"
          name="name"
          placeholder="Product name"
          validation="required"
          :validation-messages="{required: 'Name is required'}"
      />
      <FormKit
          type="file"
          label="Image"
          name="image"
          validation="required"
          :validation-messages="{required: 'Image is required'}"
          accept=".jpg"
      />
      <FormKit
          type="select"
          label="Category"
          name="category"
          placeholder="Category"
          validation="required"
          :validation-messages="{required: 'Category is required'}"
          :options="[1, 2, 3]"
      />
      <FormKit
          type="number"
          label="Price"
          name="price"
          placeholder="Product price"
          validation="required"
          :validation-messages="{required: 'Price is required'}"
          min="1"
      />
      <FormKit
          type="number"
          label="Stock"
          name="stock"
          placeholder="Stock available"
          validation="required"
          :validation-messages="{required: 'Stock is required'}"
          min="0"
      />
    </FormKit>
  </div>
</template>
