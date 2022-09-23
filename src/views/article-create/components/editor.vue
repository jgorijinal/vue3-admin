<template>
  <div class="editor-container">
    <!--富文本-->
    <div id="editor-box"></div>

    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>
<script setup>
import E from 'wangeditor'
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import { useStore } from 'vuex'
import i18next from 'i18next'
import { commitArticle, editArticle } from './commit'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})
const emits = defineEmits(['onSuccess'])
watch(
  () => props.detail,
  (value) => {
    if (value && value.content) {
      editor.txt.html(value.content)
    }
  },
  {
    immediate: true
  }
)
const store = useStore()
// Editor实例
let editor
// 处理离开页面切换语言导致 dom 无法被获取
let el
onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  // 国际化相关处理
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}

const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    // 编辑文章
    await editArticle({
      id: props.detail_id,
      title: props.title,
      content: editor.txt.html() // 当前内容从编辑器直接获取
    })
  } else {
    // 创建文章
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
    editor.txt.html('')
    emits('onSuccess')
  }
}
</script>
<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
