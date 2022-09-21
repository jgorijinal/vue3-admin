<template>
  <div class="">
    <upload :onSuccess="onSuccess"></upload>
  </div>
</template>

<script setup>
import {} from 'vue'
import { userBatchImport } from '@/api/user-manage'
import Upload from '@/components/Upload/index.vue'
import { USER_RELATIONS } from './utils'
import { ElMessage } from 'element-plus'
import router from '@/router'
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success(`${results.length}数据上传成功`)
  router.push('/user/manage')
}

const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const obj = {}
    Object.keys(item).forEach((key) => {
      obj[USER_RELATIONS[key]] = item[key]
    })
    arr.push(obj)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
