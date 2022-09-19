import storage from '@/utils/storage'
import { LANG } from '@/constant'
export default {
  namespaced: true,
  state() {
    return {
      sidebarOpened: true, // 侧边栏的 显示/收缩
      lang: storage.getItem(LANG) || 'zh' // 语言 en / zh
    }
  },
  mutations: {
    toggleSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLang(state, lang) {
      state.lang = lang
      storage.setItem(LANG, lang)
    }
  }
}
