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
