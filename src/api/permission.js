import request from '@/utils/request'

// 获取所有权限
export function permissionList() {
  return request({
    url: '/permission/list'
  })
}
