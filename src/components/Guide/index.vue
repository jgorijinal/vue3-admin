<template>
  <div class="guide">
    <el-tooltip
        class="box-item"
        effect="dark"
        :content="$t('msg.navBar.guide')"
        placement="bottom"
      >
      <el-icon :size="28" @click="onClick"  id="guide-start"><Guide /></el-icon>
      </el-tooltip>
  </div>
</template>
<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from './steps'
const i18n = useI18n()
// eslint-disable-next-line no-unused-vars
let driver
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})

const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>
<style lang="scss" scoped>
.guide {
  cursor:pointer;
}
</style>
