import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Layout,
      redirect: '/welcome',
      children: [
        {
          path: 'welcome',
          name: 'Welcome',
          component: () => import('@/views/welcome/index.vue')
        }
      ]
    }
  ]
})

export default router
