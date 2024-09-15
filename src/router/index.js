import { createRouter, createWebHistory } from 'vue-router'
import ShopView from '@/views/ShopView.vue'
import AdminLayoutView from '@/views/admnin/AdminLayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShopView
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
          component: () => import('../views/admnin/products/ProductsView.vue')
        },
        {
          path: '/admin/orders',
          name: 'orders',
          component: () => import('../views/admnin/orders/OrdersView.vue')
        },
        {
          path: '/admin/new-product',
          name: 'new-product',
          component: () => import('../views/admnin/products/NewProductView.vue')
        },
        {
          path: '/admin/edit-product/:id',
          name: 'edit-product',
          component: () => import('../views/admnin/products/EditProductView.vue')
        },
        {
          path: '/admin/import-demo',
          name: 'import-demo',
          component: () => import('../views/admnin/products/SeederView.vue')
        }
      ]
    }
  ]
})

export default router
