<template>
  <div class="app-wrapper">
    <!--左侧 menu-->
    <sidebar
      id="guide-sidebar"
      :class="$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar'"
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    ></sidebar>
    <div class="main-container" :class="$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar'">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar />
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>
<script setup>
import variables from '@/styles/variables.module.scss'
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}
.hideSidebar.sidebar-container {
  width: 61px !important;
}
.main-container.hideSidebar {
  margin-left:61px !important;
  .fixed-header {
    width: calc(100% - 61px) !important;
  }
}
</style>
