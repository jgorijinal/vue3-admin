import request from '@/utils/request'

// 获取所有文章
export function getArticleList(data) {
  return request({
    url: '/article/list',
    params: data
  })
}
