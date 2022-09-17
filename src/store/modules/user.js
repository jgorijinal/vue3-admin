import { login } from '@/api/sys'
import md5 from 'md5'
import storage from '@/utils/storage'
import { TOKEN } from '@/constant'

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
            context.commit('setToken', res.data.data.token)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
