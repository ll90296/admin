import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

Vue.use(Router)

function hasUrl(url) {
    return Store.state.userInfo.menus_url.some(item => item == url)
}

export let indexRoutes = [{
        path: '/role',
        component: () =>
            import ('@/components/views/role/role'),
        name: '角色管理',
        beforeEnter: (to, from, next) => {
            hasUrl('/role') ? next() : next('/home')
        }
    },
    {
        path: '/admin',
        component: () =>
            import ('@/components/views/user/admin'),
        name: '管理员管理',
        beforeEnter: (to, from, next) => {
            hasUrl('/admin') ? next() : next('/home')
        }

    },
    {
        path: '/cate',
        component: () =>
            import ('@/components/views/cate/cate'),
        name: '商品分类',
        beforeEnter: (to, from, next) => {
            hasUrl('/cate') ? next() : next('/home')
        }

    },
    {
        path: '/specs',
        component: () =>
            import ('@/components/views/specs/specs'),
        name: '商品规格',
        beforeEnter: (to, from, next) => {
            hasUrl('/specs') ? next() : next('/home')
        }

    },
    {
        path: '/banner',
        component: () =>
            import ('@/components/views/banner/banner'),
        name: '轮播图管理',
        beforeEnter: (to, from, next) => {
            hasUrl('/banner') ? next() : next('/home')
        }

    },
    {
        path: '/seck',
        component: () =>
            import ('@/components/views/seck/seck'),
        name: '秒杀管理',
        beforeEnter: (to, from, next) => {
            hasUrl('/seck') ? next() : next('/home')
        }

    },
    {
        path: '/member',
        component: () =>
            import ('@/components/views/member/member'),
        name: '会员管理',
        beforeEnter: (to, from, next) => {
            hasUrl('/member') ? next() : next('/home')
        }

    },
    {
        path: '/goods',
        component: () =>
            import ('@/components/views/goods/goods'),
        name: '商品管理',
        beforeEnter: (to, from, next) => {
            hasUrl('/goods') ? next() : next('/home')
        }

    },
    {
        path: '/menu',
        component: () =>
            import ('@/components/views/menu/menu'),
        name: '菜单管理',
        beforeEnter: (to, from, next) => {
            hasUrl('/menu') ? next() : next('/home')
        }
    },
]

const router = new Router({
    routes: [{
            path: '/login',
            component: () =>
                import ('@/components/pages/login')
        },
        {
            path: '/index',
            component: () =>
                import ('@/components/pages/index'),
            children: [{
                    path: '/home',
                    component: () =>
                        import ('@/components/views/home')
                },
                ...indexRoutes,
                {
                    path: '',
                    redirect: '/menu'
                }
            ],
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        next()
        return
    }
    if (Store.state.userInfo) {
        next()
        return
    }
    next('/login')
})

export default router