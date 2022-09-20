<template>
  <div class="user-container">
    <el-row>
      <el-col :span="8">
        <project-card class="project-card" :features="featureData"/>
      </el-col>
      <el-col :span="16">
        <el-card>
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature"
              ><Feature
            /></el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author"
              ><author
            /></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Author from './components/Author.vue'
import ProjectCard from './components/ProjectCard.vue'
import Feature from './components/Feature.vue'
import { feature } from '@/api/user'
const activeName = ref('feature')

const featureData = ref([])
const getFeatures = async () => {
  featureData.value = await feature()
}
getFeatures()
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 16px;
}
</style>
