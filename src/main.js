import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import { zhCn, en } from './plugins'
import i18n from './i18n'
// 初始化样式
import '@/styles/index.scss'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import installFilters from '@/filters'
const app = createApp(App)
app.use(i18n)
installFilters(app)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  .use(ElementPlus, {
    locale: store.getters.language === 'en' ? en : zhCn
  })
  .use(store)
  .use(router)
  .mount('#app')
