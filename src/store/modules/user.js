import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import storage from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state() {
    return {
      token: storage.getItem(TOKEN) || '',
      userInfo: {}
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      storage.setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    loginAction(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((res) => {
            context.commit('setToken', res.token)
            ElMessage.success('登录成功')
            // 登录后操作: 跳转
            router.push('/')
            // 设置登录时时间戳
            setTimeStamp()
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async getUserInfoAction(context) {
      const res = await getUserInfo()
      context.commit('setUserInfo', res)
      return res // 这里要返回用户信息, 后面要用到权限数据
    },
    logoutAction(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      storage.clear()
      // TODO : 清理掉权限相关配置
      router.push('/login')
    }
  }
}
