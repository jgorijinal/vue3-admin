import axios from 'axios'
console.log(process.env.VUE_APP_BASE_API)
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use((config) => {
  // 添加 icode
  config.headers.icode = 'DD22DA343836C52E'
  // 必须返回 config
  return config
})

export default service
