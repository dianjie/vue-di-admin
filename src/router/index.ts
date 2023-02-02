import { createRouter, createWebHashHistory } from 'vue-router'
import { LONGIN_NAME, LOGIN_PATH } from './constant'

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
    },
    {
      path: LOGIN_PATH,
      name: LONGIN_NAME,
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router
