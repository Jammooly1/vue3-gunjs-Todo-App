import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import { user } from '@/composables/user'

const requireAuth = (to, from, next) => {
  console.log('HELLO, I am in the route guard')
  if(!user.is) {
    next({ name: 'Login' })
    console.log('1')
  } else {
    next()
    console.log('2')
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
