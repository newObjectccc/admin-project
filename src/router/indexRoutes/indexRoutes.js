import layout from '@/views/layout'

export const indexRoutes = [
    {
        path: '/',
        name: 'layout',
        component: layout,
        redirect: '/newsSet',
        meta: { title: '首页', class: 'el-icon-menu' },
        children: [
            {
                path: '/newsSet',
                name: 'newsSet',
                component: () => import('@/views/indexPages/newsSet.vue'),
                meta: { title: '新闻设置', class: '' },
            },
            {
                path: '/mainSet',
                name: 'mainSet',
                component: () => import('@/views/indexPages/mainSet.vue'),
                meta: { title: '参数设置', class: '' },
            }
        ]
    }
]
