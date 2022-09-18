const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  // 返回 true/ false , 判断有无用户资料
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}

export default getters
