<template>
  <div class="hamburger-container">
    <el-icon v-if="$store.getters.sidebarOpened" @click="toggleClick"
      ><Menu
    /></el-icon>
    <el-icon v-else @click="toggleClick"><MoreFilled /></el-icon>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()

const toggleClick = () => {
  store.commit('app/toggleSidebarOpened')
}
</script>
<style lang="scss" scoped>
.hamburger-container {
  display: inline-block;
  width:46px;
  height: 46px;
  cursor: pointer;
}
.el-icon {
  padding:17px;
  transition: all 0.25s ease;
  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
}
</style>
