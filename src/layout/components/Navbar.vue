<template>
  <div class="navbar">
    <!--头像-->
    <hamBurger></hamBurger>
    <!--面包屑-->
    <breadcrumb class="breadcrumb"></breadcrumb>
    <div class="right-menu">
      <!--全屏切换-->
      <screenfull class="screenfull"/>
      <!--语言切换-->
      <lang-select effect="dark" class="lang-select"></lang-select>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <el-icon><Tools /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{$t('msg.navBar.home')}} </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">{{$t('msg.navBar.logout')}} </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import HamBurger from '@/layout/components/Hamburger/index.vue'
import Breadcrumb from '@/layout/components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
const store = useStore()
const logout = () => {
  store.dispatch('user/logoutAction')
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .breadcrumb{
    float:left
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
.lang-select, .screenfull {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

</style>
