<script setup>
import { useRoute } from 'vue-router'
import { useDocument, useFirestore } from 'vuefire'
import { doc } from 'firebase/firestore'
import { formatCurrency } from '@/lib/helpers.js'
import { useCart } from '@/stores/cart.js'
import { onMounted, ref } from 'vue'
import Dialog from '@/components/layout/Dialog.vue'
import { useProductsStore } from '@/stores/products.js'
import RelatedProduct from '@/components/ui/RelatedProduct.vue'

const route = useRoute()
const db = useFirestore()
const productId = ref(route.params.id)
const docRef = doc(db, 'products', productId.value)
const product = useDocument(docRef)
const cart = useCart()
const products = useProductsStore()
const dialog = ref({
  show: false,
  image: ''
})
const relatedProducts = ref([])

onMounted(() => {
  products.selectedCategory = product.value.category
  relatedProducts.value = products.filteredProducts.filter(p => p.id !== product.value.id)
})

const openDialog = () => {
  dialog.value.show = true
  dialog.value.image = product.value.image
}

const toggleFavorite = () => {
  if (products.isFavourite(product.value)) {
    products.removeFromFavourites(product.value)
  } else {
    products.addToFavourites(product.value, product.value.id)
  }
}

</script>

<template>
  <Dialog
      :modal="dialog"/>
  <div class="mt-10">
    <div class="w-full mx-auto">
      <div class="flex flex-col md:flex-row -mx-4">
        <div class="">
          <img
              class="object-cover hover:cursor-zoom-in"
              width="400"
              :src="product?.image"
              alt="Product Image"
              @click="openDialog"
          />
        </div>
        <div class="md:flex-1 px-4">
          <h2 class="text-3xl mb-5 font-bold text-gray-800">
            {{ product?.name }}</h2>
          <div class="mt-10">
            <p class="text-gray-600 text-lg">
              {{ product?.description }}
            </p>
          </div>
          <div class="my-5">
            <div class="my-10">
              <span class="text-neutral-600 font-bold text-3xl">{{ formatCurrency(product?.price) }}</span>
            </div>
            <div class="mb-5">
                <span
                    :class="[cart.checkProductAvailability(product) === 0 ? 'bg-gray-100 text-red-800 border-red-800' : 'bg-gray-100 text-teal-800']"
                    class="px-4 py-1 rounded-xl shadow-2xl text-lg font-medium">
                  {{
                    cart.checkProductAvailability(product) === 0 ? 'Out of stock' : cart.checkProductAvailability(product) + ' available'
                  }}
                </span>
            </div>
          </div>
          <div class="mt-10 flex -mx-2 mb-4">
            <div class="px-2">
              <button
                  @click="cart.addItem(product)"
                  :disabled="cart.checkProductAvailability(product) === 0"
                  class=" flex items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 text-lg font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 disabled:bg-gray-200"
              >
                <span class="ml-1">Add to cart</span>
              </button>
            </div>
            <div class="px-2">
              <button
                  @click="toggleFavorite"
                  class=" flex items-center justify-center rounded-lg bg-neutral-200 px-5 py-2.5 text-lg font-medium text-neutral-800 hover:bg-neutral-950 focus:outline-none focus:ring-4 focus:ring-neutral-300 hover:text-white"
              >
                  <span class="ml-1">
                    {{
                      products.isFavourite(product) ? 'Remove from wishlist' : 'Add to wishlist'
                    }}
                  </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
          v-if="relatedProducts.length > 0"
          class="grid grid-cols-1 gap-4"
      >
        <div class="mt-20 col-span-2 bg-gray-50 border border-gray-200 rounded-lg shadow pt-5 pb-10 px-10">
          <h1 class="text-2xl font-semibold text-gray-800">Related products</h1>
          <div
              class="text-center mx-auto mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
          >
            <RelatedProduct
                v-for="product in relatedProducts"
                :product="product"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
