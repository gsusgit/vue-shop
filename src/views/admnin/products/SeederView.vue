<script setup>
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { useFirebaseStorage, useFirestore } from 'vuefire'
import { products } from '@/data/products.js'
import PageTitle from '@/components/layout/PageTitle.vue'
import useToast from '@/composables/useToast.js'
import { useRouter } from 'vue-router'

const storage = useFirebaseStorage()
const db = useFirestore();
const { show } = useToast()
const router = useRouter()

async function seedDB() {
  const productsCollection = collection(db, "products");

  for (let i = 0; i < products.length; i++) {
    const imageName = `producto${i + 1}.jpg`;
    const storageRef = ref(storage, `products/${imageName}`);
    const uploadTask = uploadBytesResumable(storageRef, await fetchImage(imageName));

    uploadTask.on('state_changed', null, (error) => {
      console.error("Error uploading image:", error);
    }, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      await addDoc(productsCollection, {
        name: products[i].name,
        description: products[i].description,
        price: products[i].price,
        stock: products[i].stock,
        category: products[i].category,
        image: url
      });
    });
  }
  triggerToast()
}

const triggerToast = () => {
  show('Products imported', 'success')
  router.push({name: 'products'})
}

async function fetchImage(imageName) {
  const response = await fetch(`/src/assets/images/demo/${imageName}`);
  const blob = await response.blob();
  return blob;
}
</script>

<template>
  <PageTitle
      title="Import demo content"
      parentTitle="Products"/>
  <div
      class="mt-10 p-5 border border-gray-200 rounded-lg bg-white">
    <div
        id="alert-additional-content-3"
        class="p-4 mb-4 text-teal-800 border border-gray-300 rounded-lg bg-white"
        role="alert">
      <div
          class="flex items-center">
        <svg
            class="flex-shrink-0 w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20">
          <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <h3 class="text-lg font-medium">Import demo content?</h3>
      </div>
      <div class="mt-2 mb-4 text-sm">This process will import product images from the demo folder and populate the Firestore database. It's advisable that the database is empty first.
      </div>
    </div>
    <div
        class="mt-5">
      <FormKit
          type="form"
          submit-label="Import products"
          @submit="seedDB"
      />
    </div>
  </div>
</template>
