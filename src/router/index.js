import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'layout',
        component: layout,
        meta: { title: '首页' }
    },
    {
        path: '/userSet',
        name: 'userSet',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/userSet/userSet.vue'),
        meta: { title: '用户设置' }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
