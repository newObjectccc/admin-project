import layout from '@/views/layout'

export const indexRoutes = [
    {
        path: '/',
        name: 'layout',
        component: layout,
        redirect: '/newsSet',
        meta: { title: '首选项', class: 'el-icon-menu' },
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
            },
            {
                path: '/statistics',
                name: 'statistics',
                component: () => import('@/views/indexPages/statistics.vue'),
                meta: { title: '数据统计', class: '' },
            },
            {
                path: '/notionalPooling',
                name: 'notionalPooling',
                component: () => import('@/views/indexPages/notionalPooling.vue'),
                meta: { title: '归集设置', class: '' },
            },
            {
                path: '/log',
                name: 'log',
                component: () => import('@/views/indexPages/log.vue'),
                meta: { title: '查看日志', class: '' },
            }
        ]
    }
]
