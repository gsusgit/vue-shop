import { createRouter, createWebHistory } from 'vue-router'
import ShopView from '@/views/ShopView.vue'
import AdminLayoutView from '@/views/admin/AdminLayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShopView
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import('../views/FavouritesView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayoutView,
      children: [
        {
          path: '/admin/products',
          name: 'products',
          component: () => import('../views/admin/products/ProductsView.vue')
        },
        {
          path: '/admin/orders',
          name: 'orders',
          component: () => import('../views/admin/orders/OrdersView.vue')
        },
        {
          path: '/admin/new-product',
          name: 'new-product',
          component: () => import('../views/admin/products/NewProductView.vue')
        },
        {
          path: '/admin/edit-product/:id',
          name: 'edit-product',
          component: () => import('../views/admin/products/EditProductView.vue')
        },
        {
          path: '/admin/import-demo',
          name: 'import-demo',
          component: () => import('../views/admin/products/SeederView.vue')
        }
      ]
    }
  ]
})

export default router
