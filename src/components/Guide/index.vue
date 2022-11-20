<template>
  <div class="guide">
    <el-tooltip
        class="box-item"
        effect="dark"
        :content="$t('msg.navBar.guide')"
        placement="bottom"
      >
      <el-icon :size="28"><Guide /></el-icon>
      </el-tooltip>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.guide {
  cursor:pointer;
}
</style>
