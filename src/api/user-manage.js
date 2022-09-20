import request from '@/utils/request'

// 获取员工列表
export function getUserManageList(params) {
  return request({
    url: '/user-manage/list',
    params
  })
}
