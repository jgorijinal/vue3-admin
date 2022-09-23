import request from '@/utils/request'

// 获取所有文章
export function getArticleList(data) {
  return request({
    url: '/article/list',
    params: data
  })
}

/**
 * 修改排序
 */
export const articleSort = (data) => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}

// 删除文章
export function deleteArticle(id) {
  return request({
    url: `/article/delete/${id}`
  })
}

/**
 * 获取文章详情
 */
export const articleDetail = (articleId) => {
  return request({
    url: `/article/${articleId}`
  })
}
