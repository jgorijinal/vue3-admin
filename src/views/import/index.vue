<template>
  <div class="">
    <upload :onSuccess="onSuccess"></upload>
  </div>
</template>

<script setup>
import {} from 'vue'
import { userBatchImport } from '@/api/user-manage'
import Upload from '@/components/Upload/index.vue'
import { USER_RELATIONS, formatDate } from './utils'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success(results.length + i18n.t('msg.excel.importSuccess'))
  router.push('/user/manage')
}
// 筛选数据
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const obj = {}
    Object.keys(item).forEach((key) => {
      obj[USER_RELATIONS[key]] = item[key]
      // 处理 excel 的事件显示格斯
      if (USER_RELATIONS[key] === 'openTime') {
        obj[USER_RELATIONS[key]] = formatDate(item[key])
      }
    })
    arr.push(obj)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
