import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

// 1. 如果已登录, 则不允许进入 login 页面
// 2. 如果未登录, 只允许进入 login 页面及白名单
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 有 token, 说明已登录
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.hasUserInfo) {
        // 如果没有用户资料
        const { permission } = await store.dispatch('user/getUserInfoAction')
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach((route) => {
          router.addRoute(route)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
