<template>
  <div class="app-main">
    <tags-view></tags-view>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'
import { isTags } from '@/utils/tags'
import tagsView from '@/components/TagsView'
// 目标: 监听路由的变化 , 把路由对象添加到 vuex 的 tagsView 数据源中

const getTitle = (route) => {
  if (!route.meta) { // 处理无meta 的路由
    const pathArr = route.path.split('/')
    return pathArr[pathArr.length - 1]
  } else { // 有 meta 的路由
    return generateTitle(route.meta.title)
  }
}

const route = useRoute() // route 是响应式数据
const store = useStore()
watch(route, (to, from) => {
  if (!isTags(to.path)) return

  const { fullPath, name, path, meta, params, query } = to
  store.commit('app/addTagsViewList', {
    fullPath,
    name,
    path,
    meta,
    params,
    query,
    title: getTitle(to)
  })
}, {
  immediate: true
})
</script>
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
