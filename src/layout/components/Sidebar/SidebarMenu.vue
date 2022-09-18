<template>
  <el-menu
    :uniqueOpened="true"
    default-active="2"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <el-icon><setting /></el-icon>
      <span>导航 1</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><document /></el-icon>
      <span>导航 2</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><setting /></el-icon>
      <span>导航 3</span>
    </el-menu-item>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><location /></el-icon>
        <span>导航4</span>
      </template>
      <el-menu-item index="4-1">导航 4 - 1</el-menu-item>
      <el-menu-item index="4-2">导航 4 - 2</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { filterRouters, generateMenus } from '@/utils/route'

const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRouters(router.getRoutes())
  return generateMenus(fRoutes)
})
console.log(routes.value)
console.log(router.getRoutes())
// console.log(JSON.stringify(routes.value))
</script>
<style></style>
