<template>
  <div class="header-search" :class="{ show: isShow }" id="guide-search">
    <el-tooltip content="搜索" trigger="hover">
      <el-icon :size="28" class="search-icon" @click.stop="onShowClick"
        ><Search
      /></el-icon>
    </el-tooltip>
    <el-select
      v-model="search"
      class="header-search-select"
      ref="headerSearchSelectRef"
      placeholder="select"
      default-first-option
      filterable
      remote
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' - ')"
        :value="option.item.path"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Fuse from 'fuse.js'
import router from '@/router'
import { filterRouters } from '@/utils/route'
import { generateRoutes } from './FuseData'
const searchPool = computed(() => {
  const fRoutes = filterRouters(router.getRoutes())
  return generateRoutes(fRoutes)
})
const fuse = new Fuse(searchPool.value, {
  // 是否按优先级进行排序
  shouldSort: true,
  // 匹配长度超过这个值的才会被认为是匹配的
  minMatchCharLength: 1,
  // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
  // name：搜索的键
  // weight：对应的权重
  keys: [
    {
      name: 'title',
      weight: 0.7
    },
    {
      name: 'path',
      weight: 0.3
    }
  ]
})

// 控制 search 显示/隐藏
const isShow = ref(false)
// el-select 实例
const headerSearchSelectRef = ref(null)
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}
// search 搜索值
const search = ref('')

// 搜索结果 options
const searchOptions = ref([])
// 搜索方法
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
// 选中回调
const onSelectChange = (path) => {
  router.push(path)
}

// close 函数 :关闭 搜索, 输入框失去焦点, searchOptions 设为[]
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}
// watch 监听 search 打开 , 处理 close 事件
watch(isShow, () => {
  if (isShow.value) {
    document.addEventListener('click', onClose)
  } else {
    document.removeEventListener('click', onClose)
  }
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
