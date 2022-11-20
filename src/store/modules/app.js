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
    },
    // 国际化处理, 需要接受里面的title已经转变的tagsViewList
    changeTagsViewLIst(state, tags) {
      state.tagsViewList = tags
      storage.setItem(TAGS_VIEW, state.tagsViewList)
    },
    // tagsViewList 的删除相关操作
    // 注意 :  payload 接受一个对象
    // {
    //   type: 'index' || 'right' || 'other',
    //   index: 索引
    // }
    removeTagsViewList(state, { type, index }) {
      if (type === 'index') {
        state.tagsViewList.splice(index, 1)
      } else if (type === 'other') {
        state.tagsViewList.splice(
          index + 1,
          state.tagsViewList.length - index + 1
        )
        state.tagsViewList.splice(0, index)
      } else if (type === 'right') {
        state.tagsViewList.splice(
          index + 1,
          state.tagsViewList.length - index + 1
        )
      }
      storage.setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
