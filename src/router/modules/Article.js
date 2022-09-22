import layout from '@/layout'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleRanking',
  meta: { title: 'article', icon: 'document' },
  children: [
    {
      path: '/article/ranking',
      component: () => import('@/views/article-ranking/index'),
      meta: {
        title: 'articleRanking',
        icon: 'rank'
      }
    },
    {
      path: '/article/:id',
      component: () => import('@/views/article-detail/index'),
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}
