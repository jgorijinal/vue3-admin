<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :uniqueOpened="true"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <!--没有子菜单的路由-->
    <template v-for="item in noChildrenRoutes" :key="item.path">
      <el-menu-item :index="item.path">
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
    <!--有子菜单的路由-->
    <template v-for="item in hasChildrenRoutes" :key="item.path">
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="child.path"
        >
          <el-icon>
            <component :is="child.meta.icon" />
          </el-icon>
          <span>{{ child.meta.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { filterRouters, generateMenus } from '@/utils/route'

const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRouters(router.getRoutes())
  return generateMenus(fRoutes)
})

// 没有子菜单的路由
const noChildrenRoutes = computed(() => {
  return routes.value.filter((route) => JSON.stringify(route.children) === '[]')
})
// 有子菜单的路由
const hasChildrenRoutes = computed(() => {
  return routes.value.filter((route) => JSON.stringify(route.children) !== '[]')
})

// 当前路由激活项
const route = useRoute()
const activeMenu = computed(() => {
  return route.path
})
</script>
<style></style>
