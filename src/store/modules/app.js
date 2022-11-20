import storage from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'
export default {
  namespaced: true,
  state() {
    return {
      sidebarOpened: true, // 侧边栏的 显示/收缩
      lang: storage.getItem(LANG) || 'zh', // 语言 en / zh
      tagsViewList: storage.getItem(TAGS_VIEW) || [] // tags 数据源
    }
  },
  mutations: {
    toggleSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLang(state, lang) {
      state.lang = lang
      storage.setItem(LANG, lang)
    },
    // 添加 tags 数据源, 第二个参数 tag 是一个路由对象
    addTagsViewList(state, tag) {
      // 需要判断一下, 如果tag重复就不添加
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      // 如果不重复, 就添加, 并持久化
      if (!isFind) {
        state.tagsViewList.push(tag)
        storage.setItem(TAGS_VIEW, state.tagsViewList)
      }
    }
  }
}
