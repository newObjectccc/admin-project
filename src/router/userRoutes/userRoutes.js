import layout from '@/views/layout'

export const userRoutes = [
    {
        path: '/',
        name: 'layout',
        component: layout, //() => import('@/views/layout/modules/appMain.vue')
        redirect: '/userSet',
        meta: { title: '用户', class: 'el-icon-location' },
        children: [
            {
                path: '/userSet',
                name: 'userSet',
                component: () => import('@/views/userPages/userSet.vue'),
                meta: { title: '用户设置', class: '' }
            },
            {
                path: '/userAssetsSet',
                name: 'userAssetsSet',
                component: () => import('@/views/userPages/userAssetsSet.vue'),
                meta: { title: '用户资产设置', class: '' }
            },
            {
                path: '/userTreeView',
                name: 'userTreeView',
                component: () => import('@/views/userPages/userTreeView.vue'),
                meta: { title: '用户邀请视图', class: '' }
            }
        ]
    }

]
