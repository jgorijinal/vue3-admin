import store from '@/store'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { isCheckTImeout } from '@/utils/auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加 icode
    config.headers.icode = 'DD22DA343836C52E'
    // 必须返回 config
    if (store.getters.token) {
      if (isCheckTImeout()) {
        // 前端主动介入( token 失效)
        // 登出操作
        store.dispatch('user/logoutAction')
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.Authorization = 'Bearer ' + store.getters.token
    }
    return config
  },
  (err) => {
    console.log(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const { success, data, message } = res.data
    if (success) {
      // 成功返回解析后的数据
      return data
    } else {
      // 失败(请求成功, 业务失败) , 消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (err) => {
    // 处理 token 超时问题
    if (err.response && err.response.data && err.response.data.code === 401) {
      // token 超时 ->  登出
      store.dispatch('user/logoutAction')
    }
    ElMessage.error(err.message) // 提示消息
    return Promise.reject(err)
  }
)

export default service
