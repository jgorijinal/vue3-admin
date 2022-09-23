<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      >
      </el-input>

      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown :title="title" @onSuccess="onSuccess" :detail="detail"></markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <editor></editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import markdown from './components/markdown.vue'
import editor from './components/editor.vue'
import { useRoute } from 'vue-router'
import { articleDetail } from '@/api/article'
const title = ref('') // 标题
const activeName = ref('markdown')

// markdown 编辑器出来的事件 onSuccess
const onSuccess = () => {
  title.value = '' // 把 title 置空
}

// 文章编辑相关
const route = useRoute()
const articleId = route.params.id
const detail = ref({}) // 当前文章详情
const getArticleDetail = async () => {
  const res = await articleDetail(articleId)
  detail.value = res
  title.value = res.title
}
if (articleId) {
  getArticleDetail()
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
