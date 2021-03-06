import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/cards',
    name: 'Cards',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cards.vue')
  },
  {
    path: '/payments',
    name: 'Payments',
    component: () => import(/* webpackChunkName: "about" */ '../views/Payments.vue')
  },
  {
    path: '/credit',
    name: 'Credit',
    component: () => import(/* webpackChunkName: "about" */ '../views/Credit.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
