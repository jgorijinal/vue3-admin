<template>
  <div class="tags-view-container">
    <template v-for="item,index in $store.getters.tagsViewList" :key="item.fullPath">
      <router-link
        :to="{ path:item.fullPath }"
        class="tags-view-item"
        :class="isActive(item.path) ? 'active' : ''"
        @contextmenu.prevent="clickContextMenu($event, index)"
        >
        {{item.title}}
        <el-icon v-if="!isActive(item.path)" @click.stop.prevent="closeClick(index)"><Close /></el-icon>
      </router-link>
    </template>
    <context-menu v-if="visible" :index="selectedIndex" :style="contextMenuStyle"></context-menu>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import ContextMenu from '@/components/TagsView/ContextMenu.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
const route = useRoute()
// 判断是否当前激活
const isActive = (path) => {
  return route.path === path
}
const store = useStore()
// 关闭 标签页
const closeClick = () => {
  store.commit('app/removeTagsViewList', {
    type: 'index',
    index: selectedIndex.value
  })
}

const visible = ref(false) // contextMenu 显示/隐藏
const contextMenuStyle = ref({ // contextMenu  :style 样式
  left: 0,
  top: 0
})
const selectedIndex = ref(0) // contextMenu 点击的索引
const clickContextMenu = (event, index) => {
  contextMenuStyle.value.left = event.x + 'px'
  contextMenuStyle.value.top = event.y + 'px'
  visible.value = true
  selectedIndex.value = index
}
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  margin-bottom: 8px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color: #fff;
        background-color: #304156;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
      }
      // close 按钮
      .el-icon {
        width: 16px;
        height: 16px;
        line-height: 10px;
        vertical-align: -2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
  }
}
</style>
