import request from '@/utils/request'

// 获取员工列表
export function getUserManageList(params) {
  return request({
    url: '/user-manage/list',
    params
  })
}

// 批量上传
export function userBatchImport(data) {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}
// 删除用户
export function deleteUser(id) {
  return request({
    url: `/user-manage/detele/${id}`
  })
}

// 获取所有用户
export function getUserManageAllList() {
  return request({
    url: '/user-manage/all-list'
  })
}

// 获取员工详情数据
export function userDetail(id) {
  return request({
    url: `/user-manage/detail/${id}`
  })
}

// 获取指定用户的角色
export function userRoles(id) {
  return request({
    url: `/user-manage/role/${id}`
  })
}

// 给用户分配角色
export const updateRole = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles
    }
  })
}
