<template>
  <div class="profile">
    <el-row>
      <el-col :span="8">
        <project-card class="project-card" />
      </el-col>
      <el-col :span="16">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane :label="$t('msg.profile.feature')" name="feature"
            ><feature
          /></el-tab-pane>
          <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter"
            ><Chapter
          /></el-tab-pane>
          <el-tab-pane :label="$t('msg.profile.author')" name="author"
            ><author
          /></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Author from './components/Author.vue'
import ProjectCard from './components/ProjectCard.vue'
import Feature from './components/Feature.vue'
import Chapter from './components/Chapter.vue'

const activeName = ref('feature')
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 30px;
}
</style>
