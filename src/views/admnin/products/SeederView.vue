<script setup>

  import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
  import { collection, addDoc } from 'firebase/firestore'
  import { useFirebaseStorage, useFirestore  } from 'vuefire'
  import { products } from '@/data/products.js'
  import { FormKit } from '@formkit/vue'
  import PageTitle from '@/components/layout/PageTitle.vue'

  const storage = useFirebaseStorage()

  const db = useFirestore();


  async function seedDB()  {
    const productsCollection = collection(db, "products");
    for (let i = 1; i < products.length; i++) {
      const url = await getDownloadURL( ref(storage, `products/producto${i}.jpg`) );
      addDoc(productsCollection, {
        name: products[i - 1 ].name,
        price: products[i - 1 ].price,
        stock: products[i - 1 ].stock,
        category: products[i - 1 ].category,
        image: url
      }).then(() => {
        console.log("Product imported...");
      }).catch((error) => {
        console.error(error);
      });
      if(i === products.length - 1 ) {
        alert('Products imported')
      }
    }
  }

  const handleSubmit = (data) => {
    const urls = []
    data.images.forEach(fileItem => {
      const storageRef = ref(storage, '/products');
      const uploadTask = uploadBytesResumable(ref(storageRef, fileItem.name), fileItem.file);
      uploadTask.on('state_changed', snapshot => {
      }, error => {
        console.log(error)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          urls.push(downloadURL);
          if (urls.length === data.images.length) {
            alert('Images uploaded')
          }
        });
      });
    })
  }

</script>

<template>
  <PageTitle title="Import demo content" parentTitle="Products"/>
  <div class="mt-10 p-5 border border-gray-200 rounded-lg bg-white">
    <div id="alert-additional-content-3" class="p-4 mb-4 text-teal-800 border border-gray-300 rounded-lg bg-white" role="alert">
      <div class="flex items-center">
        <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Info</span>
        <h3 class="text-lg font-medium">How to import demo conent?</h3>
      </div>
      <div class="mt-2 mb-4 text-sm">
        Please, choose all the images needed first and then click on <strong>Import products</strong> button
      </div>
    </div>
    <FormKit
        type="form"
        submit-label="Import images"
        @submit="handleSubmit"
    >
      <FormKit
          label="Import images"
          type="file"
          multiple="true"
          name="images"
      />
    </FormKit>
    <div class="mt-5">
      <FormKit
          type="form"
          submit-label="Import products"
          @submit="seedDB"
      >
      </FormKit>
    </div>
  </div>
</template>
