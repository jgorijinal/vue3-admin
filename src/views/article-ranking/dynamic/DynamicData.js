import i18n from '@/i18n'

const t = i18n.global.t // 简化函数

// 动态列的数据源
export default () => [
  // 必须导出一个函数, 不能直接return 数组
  {
    prop: 'ranking',
    label: t('msg.article.ranking')
  },
  {
    prop: 'title',
    label: t('msg.article.title')
  },
  {
    prop: 'author',
    label: t('msg.article.author')
  },
  {
    prop: 'publicDate',
    label: t('msg.article.publicDate')
  },
  {
    prop: 'desc',
    label: t('msg.article.desc')
  }
]
