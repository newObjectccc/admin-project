export const userRoutes = [
    {
        path: '/userSet',
        name: 'userSet',
        component: () => import('@/views/userSet/userSet.vue'),
        meta: { title: '用户设置', class: 'el-icon-location' },
    }
]
