import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import login from '@/views/login/login.vue'
import { indexRoutes } from './indexRoutes/indexRoutes.js'
import { userRoutes } from './userRoutes/userRoutes.js'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {title: 'login', class: ''}
    },
    ...indexRoutes,
    ...userRoutes
]

const router = new VueRouter({
    mode: 'history',
    base: '/adminweb/',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.fullPath !== '/login') {
        if (!store.state._token) {
            next({ path: '/login' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
