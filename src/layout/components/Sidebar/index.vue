<template>
  <div class="">
    <div class="title" v-if="$store.getters.sidebarOpened">
      <router-link to="/profile">
        <h3>Vue3-admin</h3>
      </router-link>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import SidebarMenu from './SidebarMenu.vue'
</script>
<style lang="scss" scoped>
.title{
  padding:20px;
  text-align:center;
  color:white;
  cursor:pointer;
}
</style>
