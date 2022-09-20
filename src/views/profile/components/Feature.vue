<template>
  <div class="feature">
    <el-collapse accordion>
      <el-collapse-item
        :title="item.title"
        :name="item.title"
        v-for="item in features"
        :key="item.index"
      >
        <div>
          <span class="content" v-html="item.content"></span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>
<style lang="scss" scoped>
::v-deep .content {
  a {
    color: red;
    margin:0 4px;
  }
}
</style>
