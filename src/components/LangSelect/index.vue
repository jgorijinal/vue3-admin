<template>
  <div class="langSelect" id="guide-lang">
    <el-tooltip content="切换语言" :effect="effect" trigger="hover">
      <el-dropdown
        :hide-on-click="false"
        @command="handleClickItem"
        trigger="click"
      >
        <span class="el-dropdown-link">
          <el-icon :size="28"><Operation /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh" :disabled="currentLang === 'zh'">中文</el-dropdown-item>
            <el-dropdown-item command="en" :disabled="currentLang === 'en'">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
defineProps({
  effect: {
    // tooltip 的样式, dark/light
    type: String,
    default: 'dark',
    validator: (value) => {
      return ['light', 'dark'].indexOf(value) > -1
    }
  }
})
// 切换语言的方法
const store = useStore()
const i18n = useI18n()
const handleClickItem = (lang) => {
  i18n.locale.value = lang
  store.commit('app/setLang', lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}

const currentLang = computed(() => { // 当前语言
  return store.state.app.lang
})
</script>

<style lang="scss" scoped>
</style>
