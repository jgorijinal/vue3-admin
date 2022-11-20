<template>
  <div class="screenfull" @click="toggleClick" id="guide-full">
    <el-tooltip
      :content="isFullscreen ? '关闭全屏模式' : '开启全屏模式'"
      trigger="hover"
    >
      <el-icon v-if="!isFullscreen" :size="28"><FullScreen /></el-icon>
      <el-icon v-if="isFullscreen" :size="28"><Hide /></el-icon>
    </el-tooltip>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'
// 是否全屏
const isFullscreen = ref(false)

// 全屏切换
const toggleClick = () => {
  screenfull.toggle()
}

// 监听变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
// 设置监听器
onMounted(() => {
  screenfull.on('change', change)
})
// 删除监听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>
<style lang="scss" scoped>
.screenfull {
  .el-icon {
  }
}
</style>
