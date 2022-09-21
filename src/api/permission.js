import request from '@/utils/request'

export function permissionList() {
  return request({
    url: '/permission/list'
  })
}
