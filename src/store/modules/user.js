import { login } from '@/api/sys'
import md5 from 'md5'
export default {
  namespaced: true,
  state() {
    return {}
  },
  mutations: {},
  actions: {
    loginAction(context, userInfo) {
      console.log(process.env.VUE_APP_BASE_API)
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
