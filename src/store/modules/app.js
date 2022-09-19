export default {
  namespaced: true,
  state() {
    return {
      sidebarOpened: true // 侧边栏的 显示/收缩
    }
  },
  mutations: {
    toggleSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
      console.log(state.sidebarOpened)
    }
  }
}
