// 不需要使用 tagsView 的 path
const whiteList = ['/login', '/404', '/401/']
export const isTags = (path) => {
  return !whiteList.includes(path)
}
