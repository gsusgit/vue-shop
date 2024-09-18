import { createRouter, createWebHistory } from 'vue-router'
import ShopView from '@/views/shop/ShopView.vue'
import BackOfficeView from '@/views/backoffice/BackOfficeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShopView
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/shop/ProductView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/shop/CartView.vue'),
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import('../views/shop/FavouritesView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
    {
      path: '/backoffice',
      name: 'backoffice',
      component: BackOfficeView,
      children: [
        {
          path: '/backoffice/products',
          name: 'products',
          component: () => import('../views/backoffice/products/ProductsView.vue')
        },
        {
          path: '/backoffice/sales',
          name: 'sales',
          component: () => import('../views/backoffice/sales/SalesView.vue')
        },
        {
          path: '/backoffice/new-product',
          name: 'new-product',
          component: () => import('../views/backoffice/products/NewProductView.vue')
        },
        {
          path: '/backoffice/edit-product/:id',
          name: 'edit-product',
          component: () => import('../views/backoffice/products/EditProductView.vue')
        },
        {
          path: '/backoffice/import-demo',
          name: 'import-demo',
          component: () => import('../views/backoffice/products/SeederView.vue')
        }
      ]
    }
  ]
})

export default router
