<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'
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
// 编辑器实例
let mkEditor
// 处理离开页面切换语言导致 dom 无法被获取
let el

onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

const store = useStore()
const initEditor = () => {
  mkEditor = new MkEditor({
    // el
    el: el,
    // 高度
    height: '500px',
    // 样式
    previewStyle: 'vertical',
    // 国际化
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}

// 编辑器的国际化处理
// 问题: 问题在于, 切换语言功能无法同步, 刷新页面才生效
// 解决办法 : 监听语言的变化, 用变量保存当前编辑器里面的内容, 销毁再重建编辑器, 把原来保存的变量赋值给新创建出的编辑器实例中
watchSwitchLang(() => {
  if (!el) return
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

watch(
  () => props.detail,
  (value) => {
    if (value && value.content) {
      mkEditor.setHTML(value.content) // 设置编辑器的内容
    }
  },
  { immediate: true }
)

// 点击提交文章
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    // 编辑文章
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    // 新创建文章
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
    mkEditor.reset()
    emits('onSuccess') // 通知父亲把 title 置空
  }
}
</script>
<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
