<template>
  <div class="hamburger-container" id="guide-hamburger">
    <el-icon :size="28" v-if="$store.getters.sidebarOpened" @click="toggleClick"
      ><Fold
    /></el-icon>
    <el-icon v-else :size="28" @click="toggleClick"><Expand /></el-icon>
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
  display: flex;
  width:46px;
  justify-content: center;
  align-items: center;
  height: 50px;
  cursor: pointer;
  float: left;
}
.el-icon {
  padding:17px;
  transition: all 0.25s ease;
  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
}
</style>
