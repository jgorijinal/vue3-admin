import request from '@/utils/request'

// 获取所有角色列表
export function roleList() {
  return request({
    url: '/role/list'
  })
}

// 获取指定角色的权限
export function rolePermission(roleId) {
  return request({
    url: `/role/permission/${roleId}`
  })
}
// 分配权限
export const distributePermission = (data) => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
