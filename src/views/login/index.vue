<template>
  <div class="login-container">
    <!--表单-->
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h1 class="title">{{ $t('msg.login.title') }}</h1>
        <lang-select class="lang-select" effect="light" />
      </div>
      <!--username-->
      <el-form-item prop="username">
        <el-input
          prefix-icon="user"
          placeholder="username"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <!--password-->
      <el-form-item prop="password">
        <el-input
          prefix-icon="lock"
          placeholder="password"
          type="password"
          show-password
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <el-button
        style="width: 100%"
        type="primary"
        :loading="loading"
        @click="handleLogin"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { validatePassword } from './rules'
import { useStore } from 'vuex'
import LangSelect from '@/components/LangSelect/index.vue'
import { useI18n } from 'vue-i18n'
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
const i18n = useI18n()
const loginRules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      message: computed(() => {
        return i18n.t('msg.login.usernameRule')
      })
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: '密码为必填项'
    },
    {
      trigger: 'blur',
      validator: validatePassword
    }
  ]
}

// 处理登录
const loading = ref(false)
const store = useStore()
const loginFormRef = ref(null)
const handleLogin = () => {
  loginFormRef.value.validate((isOK) => {
    if (!isOK) return
    loading.value = true // 开启 loading 动画
    store
      .dispatch('user/loginAction', loginForm.value)
      .then(() => {
        // 登录后操作
        loading.value = false
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 100%;
      .el-input__wrapper {
        background-color: transparent;
        border: 0;
        box-shadow: none;
        width: 100%;
      }
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
      input:-internal-autofill-selected {
        background-color: #2d3a4b !important;
      }
    }
  }
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    ::v-deep .lang-select {
      position: absolute;
      right: 0;
      top: 4px;
      color: white;
      .el-icon {
        color: white;
      }
    }
  }
  .tips {
    line-height: 20px;
    color: white;
    margin-top: 20px;
  }
}
</style>
