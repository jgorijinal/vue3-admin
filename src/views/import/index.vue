<template>
  <div class="">
    <upload :onSuccess="onSuccess"></upload>
  </div>
</template>

<script setup>
import { } from 'vue'
import Upload from '@/components/Upload/index.vue'
const onSuccess = (excelData) => {
  console.log(excelData)
}
</script>

<style lang="scss" scoped></style>
