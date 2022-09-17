import { login } from '@/api/sys'
import md5 from 'md5'
import storage from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { ElMessage } from 'element-plus'
export default {
  namespaced: true,
  state() {
    return {
      token: storage.getItem(TOKEN) || ''
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      storage.setItem(TOKEN, token)
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
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
