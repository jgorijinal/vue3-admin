<template>
  <el-breadcrumb class="breadcrumb" separator="/" id="guide-breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in breadcrumbData" :key="item.path">{{
      generateTitle(item.meta.title)
    }}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { generateTitle } from '@/utils/i18n'
const breadcrumbData = ref([])
const route = useRoute()
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (route) => route.meta.icon && route.meta.title
  )
}
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
