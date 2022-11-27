import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '@/components/NotFound'
import { isAuthenticated } from "@/config/auth.js";
import Swal from 'sweetalert2';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/ContactsView.vue')
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/FavoritesView.vue')
    }
  },
  {
    path: '/auth',
    name: 'auth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AuthView.vue')
    }
  },
  {
    path: '**',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




export default router
