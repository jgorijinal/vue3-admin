<template>
  <div class="login-container">
    <!--表单-->
    <el-form class="login-form" ref="loginFormRef">
      <div class="title-container">
        <h1 class="title">后台管理系统</h1>
      </div>
      <!--username-->
      <el-form-item prop="username">
        <el-input prefix-icon="user" placeholder="username"></el-input>
      </el-form-item>
      <!--password-->
      <el-form-item prop="password">
        <el-input
          prefix-icon="lock"
          placeholder="password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-button style="width: 100%" type="primary">登录</el-button>
    </el-form>
  </div>
</template>
<script></script>
<style lang="scss" scoped></style>
