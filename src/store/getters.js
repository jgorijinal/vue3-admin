import variables from '@/styles/variables.module.scss'
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  // 返回 true/ false , 判断有无用户资料
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: (state) => variables,
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.lang
}

export default getters
