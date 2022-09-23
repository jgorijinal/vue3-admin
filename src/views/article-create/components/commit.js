// 封装创建文章函数
// 因为在markdown 编辑器和 富文本编辑器中 都会 有创建文章 环节
import { ElMessage } from 'element-plus'
import { createArticle, articleEdit } from '@/api/article'
import i18n from '@/i18n'

const t = i18n.global.t

export const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}

export const editArticle = async (data) => {
  const res = await articleEdit(data)
  ElMessage.success(t('msg.article.editorSuccess'))
  return res
}
