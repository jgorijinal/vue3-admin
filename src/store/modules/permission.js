import { publicRoutes, privateRoutes } from '@/router'

const state = {
  routes: []
}
const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...publicRoutes, ...newRoutes]
  }
}

const actions = {
  /**
   * 根据权限筛选路由
   */
  filterRoutes(context, menus) {
    // 第二个参数 menus 的是用户信息里的权限数据
    const routes = []
    // 路由权限匹配
    menus.forEach((menu) => {
      // 权限名 与 路由的 name 匹配
      routes.push(...privateRoutes.filter((route) => route.name === menu))
    })
    // 最后添加 不匹配路由进入 404
    routes.push({
      path: '/:catchAll(.*)',
      redirect: '/404'
    })
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
