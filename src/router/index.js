import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
import store from '@/store'

// 私有路由表
// const privateRoutes = [
//   {
//     path: '/user',
//     component: Layout,
//     redirect: '/user/manage',
//     meta: {
//       title: 'user',
//       icon: 'user'
//     },
//     children: [
//       {
//         path: '/user/manage',
//         name: 'userManage',
//         component: () => import('@/views/user-manage/index.vue'),
//         meta: {
//           title: 'userManage',
//           icon: 'memo'
//         }
//       },
//       {
//         path: '/user/role',
//         name: 'userRole',
//         component: () => import('@/views/role-list/index.vue'),
//         meta: {
//           title: 'roleList',
//           icon: 'user'
//         }
//       },
//       {
//         path: '/user/permission',
//         name: 'userPermission',
//         component: () => import('@/views/permission-list/index.vue'),
//         meta: {
//           title: 'permissionList',
//           icon: 'finished'
//         }
//       },
//       {
//         path: '/user/info/:id',
//         component: () => import('@/views/user-info/index.vue'),
//         props: true,
//         meta: {
//           title: 'userInfo'
//         }
//       },
//       {
//         path: '/user/import',
//         name: 'userImport',
//         component: () => import('@/views/import/index.vue'),
//         meta: {
//           title: 'excelImport'
//         }
//       }
//     ]
//   },
//   {
//     path: '/article',
//     component: Layout,
//     meta: {
//       title: 'article',
//       icon: 'document'
//     },
//     children: [
//       {
//         path: '/article/ranking',
//         name: 'articleRanking',
//         component: () => import('@/views/article-ranking/index.vue'),
//         meta: {
//           title: 'articleRanking',
//           icon: 'rank'
//         }
//       },
//       {
//         path: '/article/create',
//         name: 'articleCreate',
//         component: () => import('@/views/article-create/index.vue'),
//         meta: {
//           title: 'articleCreate',
//           icon: 'documentAdd'
//         }
//       },
//       {
//         path: '/article/editor/:id',
//         component: () => import('@/views/article-create/index.vue'),
//         meta: {
//           title: 'articleEditor'
//         }
//       },
//       {
//         path: '/article/:id',
//         component: () => import('@/views/article-detail/index.vue'),
//         meta: {
//           title: 'articleDetail'
//         }
//       }
//     ]
//   }
// ]
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
export const privateRoutes = [
  // 私有路由表
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter
]

// 公开路由表
export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/profile',
    component: Layout,
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'place'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error-page/401.vue')
  }
]
/**
 * 初始化路由表
 */
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu) // 因为 menus 它对应的都是路由的name
    })
  }
}
const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
