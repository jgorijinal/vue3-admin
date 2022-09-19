<template>
  <div class="">
    <div class="title" v-if="$store.getters.sidebarOpened">
      <router-link to="/profile">
        <h3>Vue3-admin</h3>
      </router-link>
    </div>
    <div class="title" v-else>
      <router-link to="/profile">
        <h5>Vue</h5>
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
  padding:18px 16px 16px 16px;
  text-align:center;
  color:white;
  cursor:pointer;
}
</style>
