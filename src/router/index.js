import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout'
import { userRoutes } from './userRoutes/userRoutes.js'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'layout',
        component: layout,
        meta: { title: '首页', class: 'el-icon-menu' }
    },
    {
        path: '/',
        name: 'layout',
        redirect: '/userSet',
        component: layout, //() => import('@/views/layout/modules/appMain.vue')
        meta: { title: '用户设置', class: 'el-icon-location' },
        children: [
            ...userRoutes
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
